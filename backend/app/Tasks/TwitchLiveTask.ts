import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { eventHandler, ResponseInteraction } from '../functions/EventHandler'
import Database from '@ioc:Adonis/Lucid/Database'
import axios from 'axios'
import Cache from 'App/Models/Cache'

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

  private async updateChannelsInLive(oauth: any, channelsJSON: { user_name: string }[]) {
    await Cache.updateOrCreate(
      {
        uuid: oauth.user_uuid,
      },
      {
        twitchInLive: JSON.stringify(channelsJSON),
      }
    )
  }

  private async notifyUserInLive(
    data: TwitchData,
    responseApiUuid: string,
    reponseInteraction: ResponseInteraction
  ) {
    const content: Content = {
      title: data.title,
      message: `${data.user_name} is live on Twitch!\nhttps://www.twitch.tv/${data.user_name}`,
    }
    await eventHandler(reponseInteraction, content, responseApiUuid)
  }

  private isUserNotPresent(channelsJSON: { user_name: string }[], userName: string): boolean {
    return !channelsJSON.some((channel) => channel.user_name === userName)
  }

  private logAlreadyInLive(userName: string) {
    console.log(`[Twitch] ${userName} is already in live`)
  }

  public async inLive(
    triggerApiOauth: any,
    responseApiUuid: string,
    reponseInteraction: ResponseInteraction
  ) {
    try {
      const userId = await this.fetchTwitchUserId(triggerApiOauth)
      const twitchData = await this.fetchTwitchData(triggerApiOauth, userId)
      const userCache = await Database.query()
        .from('caches')
        .where('uuid', triggerApiOauth.user_uuid)
        .first()

      if (!userCache || !userCache?.twitch_in_live) {
        const channels = twitchData.map((data: TwitchData) => ({ user_name: data.user_name }))
        if (channels === null) {
          return
        }
        await this.updateChannelsInLive(triggerApiOauth, channels)
        twitchData.map(async (data: TwitchData) => {
          await this.notifyUserInLive(data, responseApiUuid, reponseInteraction)
        })
        return
      }

      const channelsJSON = JSON.parse(userCache.twitch_in_live)

      for (const channel of channelsJSON) {
        const data = twitchData.find((data: TwitchData) => data.user_name === channel.user_name)
        if (data === undefined) {
          channelsJSON.splice(channelsJSON.indexOf(channel), 1)
          console.log('removed', channel.user_name)
          await this.updateChannelsInLive(triggerApiOauth, channelsJSON)
        }
      }

      for (const data of twitchData) {
        if (triggerApiOauth.twitch_in_live === null) {
          return
        }

        if (this.isUserNotPresent(channelsJSON, data.user_name)) {
          channelsJSON.push({ user_name: data.user_name })
          await this.updateChannelsInLive(triggerApiOauth, channelsJSON)
          await this.notifyUserInLive(data, responseApiUuid, reponseInteraction)
        } else {
          this.logAlreadyInLive(data.user_name)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async handle() {
    try {
      console.log('[Twitch] handle')
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
          await this.inLive(
            triggerApiOauth,
            responseApiUuid,
            event.response_interaction as ResponseInteraction
          )
        })
    } catch (error) {
      console.log(error)
    }
  }
}
