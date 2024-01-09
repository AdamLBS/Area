import Database from '@ioc:Adonis/Lucid/Database'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { Content, eventHandler, ResponseInteraction } from 'App/functions/EventHandler'
import axios from 'axios'
import { APIEventField } from 'types/events'

type SpotifyLikesSong = {
  total: number
}

let globalSpotifyListeners: SpotifyLikesSong = { total: -1 }

export default class SpotifyLikeSong extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everySecond()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmp/adonis5-scheduler/locks/your-class-name`
   */
  public static get useLock() {
    return false
  }

  private async fetchSpotifyData(oauth: string): Promise<SpotifyLikesSong> {
    try {
      const response = await axios.get<SpotifyLikesSong>(`https://api.spotify.com/v1/me/tracks`, {
        headers: {
          Authorization: `Bearer ${oauth}`,
        },
      })
      return response.data
    } catch (error) {
      throw new Error('Spotify API Error')
    }
  }

  public async handle() {
    const events = await Database.query()
      .from('events')
      .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'likeSong'`)
    for (const event of events) {
      const triggerApi = await Database.query()
        .from('oauths')
        .where('uuid', event.trigger_api)
        .first()
      if (triggerApi && triggerApi.token) {
        const spotifyLikesSong = await this.fetchSpotifyData(triggerApi.token)
        if (globalSpotifyListeners.total === -1) {
          globalSpotifyListeners = spotifyLikesSong
        } else if (globalSpotifyListeners.total < spotifyLikesSong.total) {
          globalSpotifyListeners = spotifyLikesSong
          const jsonVals = JSON.parse(event.response_interaction)
          const responseInteraction = jsonVals.id.toString() as ResponseInteraction
          const fields = jsonVals.fields as APIEventField<any>[]
          for (const field of fields) {
            if ((field.value as string).includes('$artist'))
              field.value = field.value.replace('$artist', 'ARTIST')
            if ((field.value as string).includes('$song'))
              field.value = field.value.replace('$song', 'SONG')
          }
          await eventHandler(responseInteraction, fields, event.responseApi)
        } else {
          globalSpotifyListeners = spotifyLikesSong
        }
      }
    }
  }
}
