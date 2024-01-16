import Database from '@ioc:Adonis/Lucid/Database'
import TriggerEventErrorException from 'App/Exceptions/TriggerEventErrorException'
import Cache from 'App/Models/Cache'
import Oauth from 'App/Models/Oauth'
import {
  ResponseInteraction,
  eventHandler,
  handleAdditionalActions,
} from 'App/functions/EventHandler'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import axios from 'axios'
import { APIEventField } from 'types/events'
import Cache from 'App/Models/Cache'
import { Commit } from 'App/types/github'

export default class GithubCheckLastCommitTask extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everyThirtySeconds()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }

  public static get useLock() {
    return false
  }

  private async updateLatestCommitId(uuid: string, commitId: string) {
    try {
      await Cache.updateOrCreate(
        {
          uuid: uuid,
        },
        {
          lastCommit: commitId,
        }
      )
    } catch (error) {
      console.error(error)
    }
  }
  private useVariablesInFields = (fields: APIEventField<any>[], response: Commit) => {
    for (const field of fields) {
      if ((field.value as string).includes('$commitAuthor')) {
        let commitAuthor = response.commit.author.name
        field.value = field.value.replace('$commitAuthor', commitAuthor)
      }
      if ((field.value as string).includes('$commitMsg')) {
        let commitMessage = response.commit.message
        field.value = field.value.replace('$commitMsg', commitMessage)
      }
      if ((field.value as string).includes('$commitUrl')) {
        let commitUrl = response.html_url
        field.value = field.value.replace('$commitUrl', commitUrl)
      }
    }
  }

  private async fetchLastCommit(repositoryUrl: string, oauth: Oauth, event: any) {
    const commitsUrl = repositoryUrl.replace('github.com', 'api.github.com/repos')
    try {
      const url = commitsUrl + '/commits?per_page=1'
      const response = (
        await axios.get(url, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${oauth.token}`,
          },
        })
      ).data[0] as Commit
      const userCache = await Cache.query().from('caches').where('uuid', event.uuid).first()
      if (!userCache || !userCache.lastCommit) {
        await this.updateLatestCommitId(event.uuid, response.sha)
      } else if (userCache.lastCommit !== response.sha) {
        await this.updateLatestCommitId(event.uuid, response.sha)
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
      throw new TriggerEventErrorException('Impossible to check the last commit', eventUuid)
    }
  }

  public async handle() {
    try {
      const events = await Database.query()
        .from('events')
        .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'newCommit'`)
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
            await this.fetchLastCommit(fields[0].value, oauth, event)
          } catch (error: any) {
            console.error(error)
            throw new TriggerEventErrorException('Impossible to check the last commit', event.uuid)
          }
        })
    } catch (error: any) {
      console.error(error)
      throw new Error('Something went wrong when fetching the last commit')
    }
  }
}
