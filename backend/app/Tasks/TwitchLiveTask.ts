import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { eventHandler, ResponseInteraction } from '../functions/EventHandler'
import Database from '@ioc:Adonis/Lucid/Database'
import axios from 'axios'
import Cache from 'App/Models/Cache'
import { APIEventField } from 'types/events'

type TwitchData = {
  id: string
  user_id: string
  user_name: string
  game_id: string
  type: string
  title: string
  viewer_count: number
  started_at: string
  language: string
  thumbnail_url: string
  tag_ids: string[]
}

type TwitchResponse = {
  data: TwitchData[]
}

export default class TwitchLiveTask extends BaseTask {
  public static get schedule() {
    console.log('[Twitch] schedule')
    return CronTimeV2.everyFiveSeconds()
  }

  public static get useLock() {
    return false
  }

  private async fetchTwitchUserId(oauth: any): Promise<string> {
    const repose = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${oauth.token}`,
      },
    })
    return repose.data.data[0].id
  }

  private async fetchTwitchData(oauth: any, user_id: string): Promise<TwitchData[]> {
    const response = await axios.get<TwitchResponse>(
      `https://api.twitch.tv/helix/streams/followed`,
      {
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${oauth.token}`,
        },
        params: {
          user_id: user_id,
        },
      }
    )
    return response.data.data
  }

  private async updateChannelsInLive(uuid: string, channelsJSON: { user_name: string }[]) {
    await Cache.updateOrCreate(
      {
        uuid: uuid,
      },
      {
        twitchInLive: JSON.stringify(channelsJSON),
      }
    )
  }

  private async notifyUserInLive(data: TwitchData, responseApiUuid: string, event: any) {
    const responseData = JSON.parse(event.response_interaction)
    const responseInteraction = responseData.id.toString() as ResponseInteraction
    const fields = responseData.fields as APIEventField<any>[]
    for (const field of fields) {
      if ((field.value as string).includes('$streamer')) {
        let streamer = data.user_name
        field.value = field.value.replace('$streamer', streamer)
      }
      if ((field.value as string).includes('$streamUrl')) {
        let streamUrl = `https://twitch.tv/${data.user_name}`
        field.value = field.value.replace('$streamUrl', streamUrl)
      }
    }
    await eventHandler(responseInteraction, fields, responseApiUuid)
  }

  private isUserNotPresent(channelsJSON: { user_name: string }[], userName: string): boolean {
    return !channelsJSON.some((channel) => channel.user_name === userName)
  }

  private logAlreadyInLive(userName: string) {
    console.log(`[Twitch] ${userName} is already in live`)
  }

  public async inLive(triggerApiOauth: any, responseApiUuid: string, event: any) {
    try {
      const userId = await this.fetchTwitchUserId(triggerApiOauth)
      const twitchData = await this.fetchTwitchData(triggerApiOauth, userId)
      const userCache = await Database.query().from('caches').where('uuid', event.uuid).first()
      if (!userCache || !userCache.twitch_in_live) {
        const channels = twitchData.map((data: TwitchData) => ({ user_name: data.user_name }))
        if (channels === null) {
          return
        }
        await this.updateChannelsInLive(event.uuid, channels)
        twitchData.map(async (data: TwitchData) => {
          await this.notifyUserInLive(data, responseApiUuid, event)
        })
        return
      } else {
        const channelsJSON = JSON.parse(userCache.twitch_in_live)

        for (const channel of channelsJSON) {
          const data = twitchData.find((data: TwitchData) => data.user_name === channel.user_name)
          if (data === undefined) {
            channelsJSON.splice(channelsJSON.indexOf(channel), 1)
            await this.updateChannelsInLive(event.uuid, channelsJSON)
          }
        }

        for (const data of twitchData) {
          if (triggerApiOauth.twitch_in_live === null) {
            return
          }

          if (this.isUserNotPresent(channelsJSON, data.user_name)) {
            channelsJSON.push({ user_name: data.user_name })
            await this.updateChannelsInLive(event.uuid, channelsJSON)
            await this.notifyUserInLive(data, responseApiUuid, event)
          } else {
            this.logAlreadyInLive(data.user_name)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async handle() {
    try {
      console.log('[TwitchLiveTask] handle')
      const events = await Database.query()
        .from('events')
        .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'startsLive'`)
      events
        .filter((event) => event.active)
        .map(async (event) => {
          const triggerApiOauth = await Database.query()
            .from('oauths')
            .where('uuid', event.trigger_api)
            .first()
          const responseApiUuid = event.response_api
          await this.inLive(triggerApiOauth, responseApiUuid, event)
        })
    } catch (error) {
      console.log(error)
    }
  }
}
