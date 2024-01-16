import Database from '@ioc:Adonis/Lucid/Database'
import TriggerEventErrorException from 'App/Exceptions/TriggerEventErrorException'
import Oauth from 'App/Models/Oauth'
import {
  ResponseInteraction,
  eventHandler,
  handleAdditionalActions,
} from 'App/functions/EventHandler'
import { CICDState } from 'App/types/github'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import axios from 'axios'
import { APIEventField } from 'types/events'
import Cache from 'App/Models/Cache'

export default class GithubCheckCICD extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everyThirtySeconds()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }

  public static get useLock() {
    return false
  }

  private async updateLatestActionId(uuid: string, actionId: string) {
    try {
      await Cache.updateOrCreate(
        {
          uuid: uuid,
        },
        {
          githubLatestActionId: actionId,
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  private useVariablesInFields = (fields: APIEventField<any>[], response: CICDState) => {
    for (const field of fields) {
      if ((field.value as string).includes('$repositoryUrl')) {
        let repoUrl = fields.at(0)?.value
        if (repoUrl !== undefined) {
          field.value = field.value.replace('$repositoryUrl', repoUrl)
        }
      }
      if ((field.value as string).includes('$reference')) {
        let commit = response.head_sha
        if (commit !== undefined) {
          field.value = field.value.replace('$reference', commit)
        }
      }
      if ((field.value as string).includes('$state')) {
        field.value = field.value.replace('$state', response.conclusion)
      }
    }
  }

  private async fetchCICD(fields: APIEventField<string>[], oauth: Oauth, event: any) {
    const apiUrl = fields[0].value.replace('github.com', 'api.github.com/repos')
    const cicdUrl = apiUrl + `/commits/${fields[1].value}/check-runs`
    const targetState = fields[2].value
    try {
      const response = (
        await axios.get(cicdUrl, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${oauth.token}`,
          },
        })
      ).data
      const lastTest = response.check_runs[0] as CICDState
      const userCache = await Cache.query().from('caches').where('uuid', event.uuid).first()
      if (!userCache || !userCache.githubLatestActionId) {
        await this.updateLatestActionId(event.uuid, String(lastTest.id))
      } else if (
        userCache !== undefined &&
        userCache.githubLatestActionId !== String(lastTest.id) &&
        lastTest.conclusion === targetState
      ) {
        await this.updateLatestActionId(event.uuid, String(lastTest.id))
        const jsonVals = JSON.parse(event.response_interaction)
        const responseInteraction = jsonVals.id.toString() as ResponseInteraction
        const fields = jsonVals.fields as APIEventField<any>[]
        this.useVariablesInFields(fields, response)
        for (const additionalAction of event.additional_actions) {
          this.useVariablesInFields(additionalAction.fields, response)
        }
        await eventHandler(responseInteraction, fields, event.response_api, event.uuid)
        await handleAdditionalActions(event)
      }
    } catch (error: any) {
      console.error(error)
      throw new TriggerEventErrorException('Impossible to check the last CI/CD', event.uuid)
    }
  }
  public async handle() {
    try {
      const events = await Database.query()
        .from('events')
        .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'checkCICD'`)
      events
        .filter((event) => event.active)
        .map(async (event) => {
          const oauth = await Oauth.query().where('uuid', event.trigger_api).first()
          if (!oauth) {
            return
          }
          try {
            const jsonVals = JSON.parse(event.trigger_interaction)
            const fields = jsonVals.fields as APIEventField<string>[]
            await this.fetchCICD(fields, oauth, event)
          } catch (error: any) {
            console.error(error)
            throw new TriggerEventErrorException('Impossible to check the last CI/CD', event.uuid)
          }
        })
    } catch (error: any) {
      console.error(error)
      throw new Error('Impossible to find the target event')
    }
  }
}
