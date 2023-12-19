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

type TwitchResponse = {
  data: TwitchData[]
}

// TODO: Implement trigger interaction
// enum TriggerInteraction {
//   IN_LIVE = 'in_live',
// }

export default class TwitchSeed extends BaseTask {
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

  private async notifyUserInLive(data: TwitchData) {
    const content: Content = {
      title: data.title,
      message: `${data.user_name} is live on Twitch!\nhttps://www.twitch.tv/${data.user_name}`,
    }
    await eventHandler(ResponseInteraction.SEND_DISCORD_MESSAGE, content, 'test') //TODO: change test to oauth_service_uuid
  }

  private isUserNotPresent(channelsJSON: { user_name: string }[], userName: string): boolean {
    return !channelsJSON.some((channel) => channel.user_name === userName)
  }

  private logAlreadyInLive(userName: string) {
    console.log(`[Twitch] ${userName} is already in live`)
  }

  private async refreshTwitchToken(oauth: any) {
    try {
      const params = {
        grant_type: 'refresh_token',
        refresh_token: oauth.refresh_token,
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
      }
      const response = await axios.post(
        `https://id.twitch.tv/oauth2/token?grant_type=${params.grant_type}&refresh_token=${params.refresh_token}&client_id=${params.client_id}&client_secret=${params.client_secret}`
      )
      console.log(oauth)
      await Database.from('oauths')
        .where('provider', 'twitch')
        .where('user_uuid', oauth.user_uuid)
        .update({ token: response.data.access_token, refresh_token: response.data.refresh_token })
    } catch (error) {
      console.log(error)
    }
  }

  public async inLive() {
    try {
      const oauths = await Database.query().from('oauths').select('*').where('provider', 'twitch')

      for (const oauth of oauths) {
        try {
          await this.refreshTwitchToken(oauth)
          const userId = await this.fetchTwitchUserId(oauth)
          const twitchData = await this.fetchTwitchData(oauth, userId)

          if (oauth.twitch_in_live === null && twitchData.length > 0) {
            const channels = twitchData.map((data: TwitchData) => ({ user_name: data.user_name }))
            if (channels === null) {
              return
            }
            await this.updateChannelsInLive(oauth, channels)
            return
          }

          const channelsJSON = JSON.parse(oauth.twitch_in_live)

          for (const channel of channelsJSON) {
            const data = twitchData.find((data: TwitchData) => data.user_name === channel.user_name)
            if (data === undefined) {
              channelsJSON.splice(channelsJSON.indexOf(channel), 1)
              console.log('removed', channel.user_name)
              await this.updateChannelsInLive(oauth, channelsJSON)
            }
          }

          for (const data of twitchData) {
            if (oauth.twitch_in_live === null) {
              return
            }

            if (this.isUserNotPresent(channelsJSON, data.user_name)) {
              channelsJSON.push({ user_name: data.user_name })
              await this.updateChannelsInLive(oauth, channelsJSON)
              await this.notifyUserInLive(data)
            } else {
              this.logAlreadyInLive(data.user_name)
            }
          }
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async handle() {
    console.log('[Twitch] handle')
    //if eventTrigger === TriggerInteraction.IN_LIVE
    await this.inLive()
  }
}
