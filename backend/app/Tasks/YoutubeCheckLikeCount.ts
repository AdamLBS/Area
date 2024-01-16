import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import Database from '@ioc:Adonis/Lucid/Database'
import {
  eventHandler,
  handleAdditionalActions,
  ResponseInteraction,
} from 'App/functions/EventHandler'
import axios from 'axios'
import { APIEventField } from 'types/events'
import Cache from 'App/Models/Cache'
import Oauth from 'App/Models/Oauth'
import TriggerEventErrorException from 'App/Exceptions/TriggerEventErrorException'

type Statistics = {
  viewCount: string
  likeCount: string
  favoriteCount: string
  commentCount: string
}

type Item = {
  statistics: Statistics
}

type YoutubeData = {
  items: Item[]
}

export default class YoutubeCheckLikeCount extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everyFifteenSeconds()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmp/adonis5-scheduler/locks/your-class-name`
   */
  public static get useLock() {
    return false
  }
  private async fetchVideoStats(oauth: string, id: string): Promise<YoutubeData> {
    try {
      const response = await axios.get<YoutubeData>(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${oauth}`,
          },
        }
      )
      return response.data as YoutubeData
    } catch (error) {
      console.log(error)
      console.log(oauth)
      throw new Error('Google API Error')
    }
  }
  private async updateLikesCount(uuid: any, likes: string) {
    await Cache.updateOrCreate(
      {
        uuid: uuid,
      },
      {
        latestNumberOfLikes: likes,
      }
    )
  }

  private useVariablesInFields = (fields: APIEventField<any>[], video: Statistics) => {
    for (const field of fields) {
      if ((field.value as string).includes('$likesCount')) {
        field.value = field.value.replace('$likesCount', video.likeCount)
      }
    }
  }

  public async handle() {
    try {
      const events = await Database.query()
        .from('events')
        .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'checkLikeCount'`)
        .where('active', true)
      for (const event of events) {
        const triggerApi = await Oauth.query().where('uuid', event.trigger_api).first()
        if (triggerApi && triggerApi.token) {
          const jsonValsAction = JSON.parse(event.trigger_interaction)
          const fields = jsonValsAction.fields as APIEventField<any>[]
          const videoId = fields[0].value
          let youtubeData
          try {
            youtubeData = await this.fetchVideoStats(triggerApi.token, videoId)
          } catch (error) {
            console.log(error)
            throw new TriggerEventErrorException('Impossible to fetch youtube data', event.uuid)
          }
          const cache = await Cache.query().where('uuid', event.uuid).first()
          if (!cache || !cache.latestNumberOfLikes) {
            await this.updateLikesCount(event.uuid, youtubeData.items[0].statistics.likeCount)
          } else if (cache.latestNumberOfLikes !== youtubeData.items[0].statistics.likeCount) {
            await this.updateLikesCount(event.uuid, youtubeData.items[0].statistics.likeCount)
            const jsonVals = JSON.parse(event.response_interaction)
            const responseInteraction = jsonVals.id.toString() as ResponseInteraction
            const fields = jsonVals.fields as APIEventField<any>[]
            this.useVariablesInFields(fields, youtubeData.items[0].statistics)
            for (const additionalAction of event.additional_actions) {
              this.useVariablesInFields(additionalAction.fields, youtubeData.items[0].statistics)
            }
            await handleAdditionalActions(event)
            await eventHandler(responseInteraction, fields, event.response_api, event.uuid)
          } else {
            await this.updateLikesCount(event.uuid, youtubeData.items[0].statistics.likeCount)
          }
        }
      }
    } catch (error) {
      console.log('ERROR ON YOUTUBE LIKE TASK : ' + error)
    }
  }
}
