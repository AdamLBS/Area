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
export interface Track {
  artists: Artist[]
  name: string
}
export interface Item {
  track: Track
}
import { Item, useVariablesInFields } from 'App/functions/SpotifyUtils'

type SpotifyLikesSong = {
  total: number
  items: Item[]
}

export default class SpotifyLikeSong extends BaseTask {
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

  private async fetchSpotifyData(oauth: string): Promise<SpotifyLikesSong> {
    try {
      const response = await axios.get<SpotifyLikesSong>(`https://api.spotify.com/v1/me/tracks`, {
        headers: {
          Authorization: `Bearer ${oauth}`,
        },
      })
      return response.data as SpotifyLikesSong
    } catch (error) {
      throw new Error('Spotify API Error')
    }
  }

  private async updateNumberOfLikedSongs(uuid: any, songs: number) {
    await Cache.updateOrCreate(
      {
        uuid: uuid,
      },
      {
        spotifyLikedSongs: songs,
      }
    )
  }

  public async handle() {
    try {
      const events = await Database.query()
        .from('events')
        .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'likeSong'`)
        .where('active', true)
      for (const event of events) {
        const triggerApi = await Database.query()
          .from('oauths')
          .where('uuid', event.trigger_api)
          .first()
        const spotifyLikesSong = await this.fetchSpotifyData(triggerApi.token)
        const userCache = await Cache.query().from('caches').where('uuid', event.uuid).first()
        if (triggerApi && triggerApi.token) {
          if (!userCache || !userCache.spotifyLikedSongs) {
            try {
              await this.updateNumberOfLikedSongs(event.uuid, spotifyLikesSong.total)
            } catch (error) {
              console.error(error)
              throw new TriggerEventErrorException(
                'Impossible to update spotify liked songs',
                event.uuid
              )
            }
          } else if (Number(userCache.spotifyLikedSongs) < spotifyLikesSong.total) {
            const jsonVals = JSON.parse(event.response_interaction)
            const responseInteraction = jsonVals.id.toString() as ResponseInteraction
            const fields = jsonVals.fields as APIEventField<any>[]
            useVariablesInFields(
              fields,
              spotifyLikesSong.items[0].track.name,
              spotifyLikesSong.items[0].track.artists
            )
            for (const additionalAction of event.additional_actions) {
              useVariablesInFields(
                additionalAction.fields,
                spotifyLikesSong.items[0].track.name,
                spotifyLikesSong.items[0].track.artists
              )
            }
            await handleAdditionalActions(event)
            await eventHandler(responseInteraction, fields, event.response_api, event.uuid)
          }
          await this.updateNumberOfLikedSongs(event.uuid, spotifyLikesSong.total)
        }
      }
    } catch (error) {
      console.log('ERROR ON SPOTIFY LIKE TASK : ' + error)
    }
  }
}
