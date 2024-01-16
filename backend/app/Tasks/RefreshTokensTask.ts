import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import Database from '@ioc:Adonis/Lucid/Database'
import axios from 'axios'
import Oauth from 'App/Models/Oauth'

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
    return CronTimeV2.everyTwoMinutes()
  }

  public static get useLock() {
    return false
  }

  private async discordRefreshToken(oauth: any) {
    try {
      const data = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: oauth.refresh_token,
      })
      const auth = Buffer.from(
        `${process.env.DISCORD_CLIENT_ID}:${process.env.DISCORD_CLIENT_SECRET}`
      ).toString('base64')
      const authHeader = `Basic ${auth}`
      const response = await axios.post<RefreshToken>(
        'https://discord.com/api/oauth2/token',
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeader,
          },
        }
      )
      await Oauth.updateOrCreate(
        {
          userUuid: oauth.user_uuid,
          provider: 'discord',
        },
        {
          token: response.data.access_token,
          refreshToken: response.data.refresh_token,
        }
      )
    } catch (error) {
      console.log(error)
    }
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
        `${apiUrl}?grant_type=${params.grant_type}&refresh_token=${params.refresh_token}&client_id=${params.client_id}&client_secret=${params.client_secret}`
      )
      await Oauth.updateOrCreate(
        {
          userUuid: oauth.user_uuid,
          provider: provider,
        },
        {
          token: response.data.access_token,
          refreshToken: response.data.refresh_token,
        }
      )
      console.log(`[Refresh Token] ${provider} token refreshed`)
    } catch (error) {
      console.log(error)
    }
  }

  public async handle() {
    try {
      const oauths = await Database.from('oauths')
      for (const oauth of oauths) {
        if (oauth.provider === 'twitch') {
          await this.refreshToken(
            oauth,
            'twitch',
            'https://id.twitch.tv/oauth2/token',
            process.env.TWITCH_CLIENT_ID,
            process.env.TWITCH_CLIENT_SECRET
          )
        } else if (oauth.provider === 'spotify') {
          await this.refreshToken(
            oauth,
            'spotify',
            'https://accounts.spotify.com/api/token',
            process.env.SPOTIFY_CLIENT_ID,
            process.env.SPOTIFY_CLIENT_SECRET
          )
        } else if (oauth.provider === 'discord') {
          await this.discordRefreshToken(oauth)
        } else if (oauth.provider === 'github') {
          await this.refreshToken(
            oauth,
            'github',
            'https://github.com/login/oauth/access_token',
            process.env.GITHUB_CLIENT_ID,
            process.env.GITHUB_CLIENT_SECRET
          )
        } else if (oauth.provider === 'google') {
          await this.refreshToken(
            oauth,
            'google',
            'https://oauth2.googleapis.com/token',
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
          )
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
