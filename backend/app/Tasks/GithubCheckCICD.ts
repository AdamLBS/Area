import Database from '@ioc:Adonis/Lucid/Database'
import Oauth from 'App/Models/Oauth'
import { Content, ResponseInteraction, eventHandler } from 'App/functions/EventHandler'
import { CICDState } from 'App/types/github'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import axios from 'axios'
import { APIEventField } from 'types/events'

export default class GithubCheckCICD extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everySecond()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }

  public static get useLock() {
    return false
  }

  private async fetchCICD(
    fields: APIEventField<string>[],
    oauth: Oauth,
    responseApiUuid: string,
    reponseInteraction: ResponseInteraction
  ) {
    const apiUrl = fields[0].value.replace('github.com', 'api.github.com/repos')
    const cicdUrl = apiUrl + `/commits/${fields[1].value}/check-runs`
    console.log(cicdUrl)
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
      if (targetState === lastTest.conclusion) {
        const content: Content = {
          title: '',
          message: '',
        }
        await eventHandler(reponseInteraction, content, responseApiUuid)
      }
      console.log(false)
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
            await this.fetchCICD(
              fields,
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
