import Database from '@ioc:Adonis/Lucid/Database'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { eventHandler, ResponseInteraction } from 'App/functions/EventHandler'
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
  uri: string
}

type SpotifySong = {
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

export default class SpotifyChangeMusicTask extends BaseTask {
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

  private async updateSpotifyMusicUri(uuid: string, music: string) {
    await Cache.updateOrCreate(
      {
        uuid: uuid,
      },
      {
        spotifySongUri: music,
      }
    )
  }

  private async fetchSpotifyData(oauth: string): Promise<SpotifySong | undefined> {
    const response = await axios.get<SpotifySong>(`https://api.spotify.com/v1/me/player`, {
      headers: {
        Authorization: `Bearer ${oauth}`,
      },
    })
    if (response.status !== 200) {
      return undefined
    }
    return response.data
  }

  public async handle() {
    try {
      const events = await Database.query()
        .from('events')
        .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'changeSong'`)
      for (const event of events) {
        const triggerApi = await Database.query()
          .from('oauths')
          .where('uuid', event.trigger_api)
          .first()
        const spotifyMusicData = await this.fetchSpotifyData(triggerApi.token)
        const userCache = await Cache.query().from('caches').where('uuid', event.uuid).first()
        if (triggerApi && triggerApi.token) {
          if (!userCache || !userCache.spotifySongUri) {
            try {
              await this.updateSpotifyMusicUri(event.uuid, spotifyMusicData?.item.uri as string)
            } catch (error) {
              console.error(error)
              throw new TriggerEventErrorException('Impossible to update spotify uri', event.uuid)
            }
          } else if (
            spotifyMusicData !== undefined &&
            (userCache.spotifySongUri as string) !== (spotifyMusicData.item.uri as string)
          ) {
            try {
              ;(async () =>
                await this.updateSpotifyMusicUri(
                  event.uuid,
                  spotifyMusicData?.item.uri as string
                ))()
            } catch (error) {
              console.error(error)
              throw new TriggerEventErrorException('Impossible to update spotify uri', event.uuid)
            }
            const jsonVals = JSON.parse(event.response_interaction)
            const responseInteraction = jsonVals.id.toString() as ResponseInteraction
            const fields = jsonVals.fields as APIEventField<any>[]
            for (const field of fields) {
              if ((field.value as string).includes('$artist')) {
                let replaceValue = ''
                for (const artist of spotifyMusicData?.item.artists) {
                  replaceValue += artist.name
                  if (
                    spotifyMusicData.item.artists.length === 2 &&
                    artist === spotifyMusicData.item.artists[0]
                  )
                    replaceValue += ' et '
                  else if (
                    spotifyMusicData.item.artists.indexOf(artist) !==
                    spotifyMusicData.item.artists.length - 1
                  )
                    replaceValue += ', '
                }
                field.value = field.value.replace('$artist', replaceValue)
              }
              if ((field.value as string).includes('$song'))
                field.value = field.value.replace('$song', spotifyMusicData.item.name)
            }

            await eventHandler(responseInteraction, fields, event.response_api, event.uuid)
          }
        }
      }
    } catch (error) {
      console.log('ERROR ON SPOTIFY CHANGE MUSIC TASK : ' + error)
    }
  }
}
