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

type SpotifyLikesSong = {
  total: number
  items: Item[]
}

export default class SpotifyLikeSong extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everyFiveSeconds()
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
      for (const event of events) {
        const triggerApi = await Database.query()
          .from('oauths')
          .where('uuid', event.trigger_api)
          .first()
        const spotifyLikesSong = await this.fetchSpotifyData(triggerApi.token)
        const userCache = await Cache.query().from('caches').where('uuid', event.uuid).first()
        if (triggerApi && triggerApi.token) {
          if (!userCache || !userCache.spotifyLikedSongs) {
            await this.updateNumberOfLikedSongs(event.uuid, spotifyLikesSong.total)
          } else if (userCache.spotifyLikedSongs < spotifyLikesSong.total) {
            ;(async () => await this.updateNumberOfLikedSongs(event.uuid, spotifyLikesSong.total))()
            const jsonVals = JSON.parse(event.response_interaction)
            const responseInteraction = jsonVals.id.toString() as ResponseInteraction
            const fields = jsonVals.fields as APIEventField<any>[]
            for (const field of fields) {
              if ((field.value as string).includes('$artist')) {
                let replaceValue = ''
                for (const artist of spotifyLikesSong.items[0].track.artists) {
                  replaceValue += artist.name
                  if (
                    spotifyLikesSong.items[0].track.artists.length === 2 &&
                    artist === spotifyLikesSong.items[0].track.artists[0]
                  )
                    replaceValue += ' et '
                  else if (
                    spotifyLikesSong.items[0].track.artists.indexOf(artist) !==
                    spotifyLikesSong.items[0].track.artists.length - 1
                  )
                    replaceValue += ', '
                }
                field.value = field.value.replace('$artist', replaceValue)
              }
              if ((field.value as string).includes('$song'))
                field.value = field.value.replace('$song', spotifyLikesSong.items[0].track.name)
            }
            await handleAdditionalActions(event)
            await eventHandler(responseInteraction, fields, event.response_api)
          }
        }
      }
    } catch (error) {
      console.log('ERROR ON SPOTIFY LIKE TASK : ' + error)
    }
  }
}
