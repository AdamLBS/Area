import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import Database from '@ioc:Adonis/Lucid/Database'
import axios from 'axios'

type RefreshToken = {
  access_token: string
  token_type: string
  scope: string[] | string
  expires_in: number
  refresh_token: string
}

export default class RefreshTokensTask extends BaseTask {
  public static get schedule() {
    console.log('[Refresh Token] schedule')
    return CronTimeV2.everyFifteenSeconds()
  }

  public static get useLock() {
    return false
  }

  private async refreshToken(
    oauth: any,
    provider: string,
    apiUrl: string,
    clientId?: string,
    clientSecret?: string
  ) {
    try {
      const params = {
        grant_type: 'refresh_token',
        refresh_token: oauth.refresh_token,
        client_id: clientId,
        client_secret: clientSecret,
      }

      const response = await axios.post<RefreshToken>(
        `https://id.twitch.tv/oauth2/token?grant_type=${params.grant_type}&refresh_token=${params.refresh_token}&client_id=${params.client_id}&client_secret=${params.client_secret}`
      )
      await Database.from('oauths')
        .where('provider', provider)
        .where('user_uuid', oauth.user_uuid)
        .update({ token: response.data.access_token, refresh_token: response.data.refresh_token })
    } catch (error) {
      console.log(error)
    }
  }

  public async handle() {
    try {
      const oauths = await Database.from('oauths')
      var num = 0
      for (const oauth of oauths) {
        if (oauth.provider === 'twitch') await this.refreshTwitchToken(oauth)
      }
    } catch (error) {
      console.log(error)
    }
  }
}
