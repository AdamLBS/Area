import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { eventHandler, Content, ResponseInteraction } from '../functions/EventHandler'
import Database from '@ioc:Adonis/Lucid/Database'
import axios from 'axios'

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

type TwitchRefreshToken = {
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string[]
  token_type: string
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
    await Database.from('oauths')
      .where('provider', 'twitch')
      .where('user_uuid', oauth.user_uuid)
      .update({ twitch_in_live: JSON.stringify(channelsJSON) }) //  create a new element of a new table twitch_history
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

      if (triggerApiOauth.twitch_in_live === null && twitchData.length > 0) {
        const channels = twitchData.map((data: TwitchData) => ({ user_name: data.user_name }))
        if (channels === null) {
          return
        }
        await this.updateChannelsInLive(triggerApiOauth, channels)
        return
      }

      const channelsJSON = JSON.parse(triggerApiOauth.twitch_in_live)

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
      for (const event of events) {
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
      }
    } catch (error) {
      console.log(error)
    }
  }
}
