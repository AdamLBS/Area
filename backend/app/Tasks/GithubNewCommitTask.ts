import Database from '@ioc:Adonis/Lucid/Database'
import Cache from 'App/Models/Cache'
import Oauth from 'App/Models/Oauth'
import { Content, ResponseInteraction, eventHandler } from 'App/functions/EventHandler'
import { Commit } from 'App/types/github'
import { OauthType } from 'App/types/oauth'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import axios from 'axios'
import { APIEventField } from 'types/events'

export default class GithubCheckLastCommitTask extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everySecond()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }

  public static get useLock() {
    return false
  }

  private async fetchLastCommit(
    commitsUrl: string,
    oauth: Oauth,
    responseApiUuid: string,
    reponseInteraction: ResponseInteraction
  ) {
    console.log('user uuid', oauth.userUuid)
    const userCache = await Database.query().from('caches').where('uuid', oauth.userUuid).first()
    try {
      const url = commitsUrl + '?per_page=1'
      const response = (
        await axios.get(url, {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${oauth.token}`,
          },
        })
      ).data[0] as Commit
      if (!userCache || !userCache?.last_commit || userCache.last_commit !== response.sha) {
        await Cache.updateOrCreate(
          {
            uuid: oauth.userUuid,
          },
          {
            lastCommit: response.sha,
          }
        )
        const content: Content = {
          title: '',
          message: '',
        }
        await eventHandler(reponseInteraction, content, responseApiUuid)
      }
    } catch (error: any) {
      console.error(error)
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
            const result = await this.fetchLastCommit(
              fields[0].value,
              oauth,
              event.response_api,
              event.response_interaction as ResponseInteraction
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
