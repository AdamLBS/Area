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

interface Video {
  title: string
  description: string
  channelTitle: string
}

interface Item {
  kind: string
  id: string
  snippet: Video
}

type YoutubeData = {
  items: Item[]
}

export default class YoutubeCheckLike extends BaseTask {
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
  private async fetchYoutubeData(oauth: string): Promise<YoutubeData> {
    try {
      const response = await axios.get<YoutubeData>(
        `https://www.googleapis.com/youtube/v3/videos?myRating=like&part=snippet`,
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
  private async updateLatestLikedVideo(uuid: any, videoId: string) {
    await Cache.updateOrCreate(
      {
        uuid: uuid,
      },
      {
        latestLikedVideoId: videoId,
      }
    )
  }

  private useVariablesInFields = (fields: APIEventField<any>[], video: Item) => {
    for (const field of fields) {
      if ((field.value as string).includes('$videoTitle')) {
        field.value = field.value.replace('$videoTitle', video.snippet.title)
      }
      if ((field.value as string).includes('$channelName')) {
        field.value = field.value.replace('$channelName', video.snippet.channelTitle)
      }
      if ((field.value as string).includes('$videoUrl')) {
        field.value = field.value.replace(
          '$videoUrl',
          `https://www.youtube.com/watch?v=${video.id}`
        )
      }
    }
  }

  public async handle() {
    try {
      const events = await Database.query()
        .from('events')
        .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'newVideoLike'`)
        .where('active', true)
      for (const event of events) {
        const triggerApi = await Database.query()
          .from('oauths')
          .where('uuid', event.trigger_api)
          .first()
        const youtubeData = await this.fetchYoutubeData(triggerApi.token)
        const cache = await Cache.query().from('caches').where('uuid', event.uuid).first()
        if (!cache || !cache.latestLikedVideoId) {
          await this.updateLatestLikedVideo(event.uuid, youtubeData.items[0].id)
        } else if (cache.latestLikedVideoId !== youtubeData.items[0].id) {
          await this.updateLatestLikedVideo(event.uuid, youtubeData.items[0].id)
          const jsonVals = JSON.parse(event.response_interaction)
          const responseInteraction = jsonVals.id.toString() as ResponseInteraction
          const fields = jsonVals.fields as APIEventField<any>[]
          this.useVariablesInFields(fields, youtubeData.items[0])
          for (const additionalAction of event.additional_actions) {
            this.useVariablesInFields(additionalAction.fields, youtubeData.items[0])
          }
          await handleAdditionalActions(event)
          await eventHandler(responseInteraction, fields, event.response_api)
        } else {
          await this.updateLatestLikedVideo(event.uuid, youtubeData.items[0].id)
        }
      }
    } catch (error) {
      console.log('ERROR ON YOUTUBE LIKE TASK : ' + error)
    }
  }
}
