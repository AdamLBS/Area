import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import Database from '@ioc:Adonis/Lucid/Database'
import axios from 'axios'
import { eventHandler, ResponseInteraction } from '../functions/EventHandler'

type SpotifyListener = {
  shuffle_state: boolean
  repeat_state: string
  device: {
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    type: string
    volume_percent: number
  }
  progress_ms: number
  is_playing: boolean
  currently_playing_type: string
  item: {
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
  }
}

let globalSpotifyListeners: SpotifyListener[] = [] //TODO: Optimiser après la defense

export default class SpotifyListenTask extends BaseTask {
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

  private async fetchSpotifyData(oauth: string): Promise<SpotifyListener> {
    const response = await axios.get<SpotifyListener>(`https://api.spotify.com/v1/me/player`, {
      headers: {
        Authorization: `Bearer ${oauth}`,
      },
    })
    if (response.status !== 200) {
      console.log(response.data)
      throw new Error('Spotify API Error')
    }
    return response.data
  }
  public async checkEventsInDB() {
    try {
      const events = await Database.query()
        .from('events')
        .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'listenMusic'`)
      for (const event of events) {
        const triggerApi = await Database.query()
          .from('oauths')
          .where('uuid', event.trigger_api)
          .first()
        try {
          let spotifyListener = await this.fetchSpotifyData(triggerApi.token)
          if (
            globalSpotifyListeners.find(
              (spotifyListenerSec) => spotifyListenerSec.device.id === spotifyListener.device.id
            ) === undefined
          ) {
            globalSpotifyListeners.push(spotifyListener)
          } else {
            let tmpSpotifyListener = globalSpotifyListeners.find(
              (existingListener) => existingListener.device.id === spotifyListener.device.id
            )
            if (
              tmpSpotifyListener !== undefined &&
              tmpSpotifyListener.item.uri !== null &&
              tmpSpotifyListener.item.uri !== spotifyListener.item.uri
            ) {
              console.log('Event triggered you have changed the music')
              const jsonVals = JSON.parse(event.response_interaction)
              const responseInteraction = jsonVals.id.toString() as ResponseInteraction
              const fields = jsonVals.fields
              const content: Content = {
                title: '',
                message: '',
                fields: fields,
              }
              globalSpotifyListeners.splice(globalSpotifyListeners.indexOf(tmpSpotifyListener), 1)
              globalSpotifyListeners.push(spotifyListener)
              await eventHandler(responseInteraction, content, event.response_api)
            }
          }
        } catch (error) {
          console.log('User is not listening to music')
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async handle() {
    await this.checkEventsInDB()
  }
}
