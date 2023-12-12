import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { eventHandler, Content, ResponseInteraction } from '../functions/EventHandler'
import Database from '@ioc:Adonis/Lucid/Database'
import axios, { AxiosResponse } from 'axios'

// Implement typings for axios response
type TwitchResponse = {
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

// Implement trigger interaction
enum TriggerInteraction {
  IN_LIVE = 'in_live',
}

export default class TwitchSeed extends BaseTask {
  public static get schedule() {
    console.log('[Twitch] schedule')
    return CronTimeV2.everySecond()
  }

  public static get useLock() {
    return false
  }

  private async fetchTwitchData(oauth: any): Promise<AxiosResponse<TwitchResponse[]>> {
    return axios.get(`https://api.twitch.tv/helix/streams/followed`, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${oauth.token}`,
      },
      params: {
        user_id: oauth.user_id,
      },
    })
  }

  private async updateChannelsInLive(oauth: any, channelsJSON: { user_name: string }[]) {
    await Database.from('oauths')
      .where('provider', 'twitch')
      .where('user_uuid', oauth.user_uuid)
      .update({ twitch_in_live: JSON.stringify(channelsJSON) })
  }

  private async notifyUserInLive(data: TwitchResponse) {
    const content: Content = {
      title: data.title,
      message: `${data.user_name} is live on Twitch!\nhttps://www.twitch.tv/${data.user_name}`,
    }
    // await eventHandler(ResponseInteraction.SEND_DISCORD_MESSAGE, content);
  }

  private isUserPresent(channelsJSON: { user_name: string }[], userName: string): boolean {
    return channelsJSON.some((channel) => channel.user_name === userName)
  }

  private logAlreadyInLive(userName: string) {
    console.log(`[Twitch] ${userName} is already in live`)
  }

  public async inLive() {
    const oauths = await Database.query().from('oauths').select('*').where('provider', 'twitch')

    for (const oauth of oauths) {
      try {
        const response = await this.fetchTwitchData(oauth)
        const twitchData = response.data.data

        if (oauth.twitch_in_live === null && twitchData.length > 0) {
          const channels = JSON.stringify(
            twitchData.map((data: TwitchResponse) => ({ user_name: data.user_name }))
          )
          await this.updateChannelsInLive(oauth, JSON.parse(channels))
        }

        for (const data of twitchData) {
          if (oauth.twitch_in_live === null) {
            return
          }

          const channelsJSON = JSON.parse(oauth.twitch_in_live)
          if (!this.isUserPresent(channelsJSON, data.user_name)) {
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
  }

  public async handle() {
    console.log('[Twitch] handle')
    await this.inLive()
  }
}
