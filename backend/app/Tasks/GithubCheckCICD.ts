import Database from '@ioc:Adonis/Lucid/Database'
import Oauth from 'App/Models/Oauth'
import { ResponseInteraction, eventHandler } from 'App/functions/EventHandler'
import { CICDState } from 'App/types/github'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import axios from 'axios'
import { APIEventField } from 'types/events'
import Cache from 'App/Models/Cache'

export default class GithubCheckCICD extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everySecond()
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

  private async fetchCICD(
    fields: APIEventField<string>[],
    oauth: Oauth,
    eventUuid: string,
    responseApiUuid: string,
    reponseInteraction: ResponseInteraction,
    responseFields: APIEventField<string>[]
  ) {
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
      const userCache = await Cache.query().from('caches').where('uuid', eventUuid).first()
      if (!userCache || !userCache.githubLatestActionId) {
        await this.updateLatestActionId(eventUuid, String(lastTest.id))
      } else if (
        userCache !== undefined &&
        userCache.githubLatestActionId !== String(lastTest.id) &&
        lastTest.conclusion === targetState
      ) {
        await this.updateLatestActionId(eventUuid, String(lastTest.id))
        for (const field of responseFields) {
          if ((field.value as string).includes('$repositoryUrl')) {
            let repoUrl = fields.at(0)?.value
            if (repoUrl !== undefined) {
              field.value = field.value.replace('$repositoryUrl', repoUrl)
            }
          }
          if ((field.value as string).includes('$reference')) {
            let commit = lastTest.head_sha
            if (commit !== undefined) {
              field.value = field.value.replace('$reference', commit)
            }
          }
          if ((field.value as string).includes('$state')) {
            field.value = field.value.replace('$state', lastTest.conclusion)
          }
        }
        await eventHandler(reponseInteraction, responseFields, responseApiUuid)
      }
      console.log('eee')
    } catch (error: any) {
      // console.error(error)
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
            const jsonResponse = JSON.parse(event.response_interaction)
            const responseFields = jsonResponse.fields as APIEventField<string>[]
            const responseInteraction = jsonResponse.id.toString() as ResponseInteraction
            await this.fetchCICD(
              fields,
              oauth,
              event.uuid,
              event.response_api,
              responseInteraction,
              responseFields
            )
          } catch (error: any) {
            console.error(error)
            throw new Error('Impossible to fetch the last commit')
          }
        })
    } catch (error: any) {
      console.error(error)
      throw new Error('Something went wrong when fetching the last commit')
    }
  }
}
