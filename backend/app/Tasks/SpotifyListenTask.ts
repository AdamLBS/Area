import Database from '@ioc:Adonis/Lucid/Database'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import {
  eventHandler,
  handleAdditionalActions,
  ResponseInteraction,
} from 'App/functions/EventHandler'
import axios from 'axios'
import { APIEventField } from 'types/events'
import Cache from 'App/Models/Cache'
import TriggerEventErrorException from 'App/Exceptions/TriggerEventErrorException'

export interface Artist {
  name: string
}
export interface Item {
  artists: Artist[]
  name: string
}
import { useVariablesInFields } from 'App/functions/SpotifyUtils'

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
  item: Item
}

export default class SpotifyListenTask extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everyTenSeconds()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmp/adonis5-scheduler/locks/your-class-name`
   */
  public static get useLock() {
    return false
  }

  private async updateSpotifyListeningStatus(uuid: string, listening: boolean) {
    await Cache.updateOrCreate(
      {
        uuid: uuid,
      },
      {
        spotifyListening: listening,
      }
    )
  }

  private async fetchSpotifyData(oauth: string): Promise<SpotifyListener | undefined> {
    const response = await axios.get<SpotifyListener>(`https://api.spotify.com/v1/me/player`, {
      headers: {
        Authorization: `Bearer ${oauth}`,
      },
    })
    if (response.status !== 200) {
      return undefined
    }
    return response.data
  }
  public async checkEventsInDB() {
    try {
      const events = await Database.query()
        .from('events')
        .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'listenMusic'`)
        .where('active', true)
      for (const event of events) {
        const triggerApi = await Database.query()
          .from('oauths')
          .where('uuid', event.trigger_api)
          .first()
        const spotifyAPIData = await this.fetchSpotifyData(triggerApi.token)
        const userCache = await Cache.query().from('caches').where('uuid', event.uuid).first()
        const isListening = spotifyAPIData !== undefined && spotifyAPIData.is_playing
        if (triggerApi && triggerApi.token) {
          if (!userCache || userCache.spotifyListening === undefined) {
            try {
              await this.updateSpotifyListeningStatus(event.uuid, isListening)
            } catch (error) {
              console.error(error)
              throw new TriggerEventErrorException(
                'Impossible to update the spotify listening status',
                event.uuid
              )
            }
          } else if (userCache.spotifyListening !== isListening && spotifyAPIData !== undefined) {
            if (isListening === true) {
              const jsonVals = JSON.parse(event.response_interaction)
              const responseInteraction = jsonVals.id.toString() as ResponseInteraction
              const fields = jsonVals.fields as APIEventField<any>[]
              useVariablesInFields(fields, spotifyAPIData.item.name, spotifyAPIData.item.artists)
              for (const additionalAction of event.additional_actions) {
                useVariablesInFields(
                  additionalAction.fields as APIEventField<any>[],
                  spotifyAPIData.item.name,
                  spotifyAPIData.item.artists
                )
              }
              await handleAdditionalActions(event)
              await eventHandler(responseInteraction, fields, event.response_api, event.uuid)
            }
          }
          await this.updateSpotifyListeningStatus(event.uuid, isListening)
        }
      }
    } catch (error) {
      console.log('ERROR ON SPOTIFY LISTEN TASK : ' + error)
    }
  }

  public async handle() {
    await this.checkEventsInDB()
  }
}
