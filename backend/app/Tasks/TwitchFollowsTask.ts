import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import {
  eventHandler,
  handleAdditionalActions,
  ResponseInteraction,
} from '../functions/EventHandler'
import Database from '@ioc:Adonis/Lucid/Database'
import axios from 'axios'
import Cache from 'App/Models/Cache'
import { APIEventField } from 'types/events'

type TwitchData = {
  total: number
  data: {
    user_id: string
    user_login: string
    user_name: string
    followed_at: string
  }[]
  pagination: {}
}

export default class TwitchLiveTask extends BaseTask {
  public static get schedule() {
    return CronTimeV2.everyFifteenSeconds()
  }

  public static get useLock() {
    return false
  }

  private async fetchTwitchUserId(oauth: any, username: string): Promise<string> {
    const repose = await axios.get('https://api.twitch.tv/helix/users', {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${oauth.token}`,
      },
      params: {
        login: username,
      },
    })
    return repose.data.data[0].id
  }

  private async fetchTwitchData(oauth: any, channel_id: string): Promise<TwitchData> {
    const response = await axios.get<TwitchData>(`https://api.twitch.tv/helix/channels/followers`, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${oauth.token}`,
      },
      params: {
        broadcaster_id: channel_id,
      },
    })
    return response.data
  }

  private useVariablesInFields = (
    fields: APIEventField<any>[],
    data: TwitchData,
    currentFollowersNumb: number
  ) => {
    for (const field of fields) {
      if ((field.value as string).includes('$followers')) {
        const followers: string[] = []
        let i = 0
        data.data.map((user) => {
          if (i === data.total - currentFollowersNumb) return
          followers.push(user.user_name)
          i++
        })
        const stringFollowers = followers.join(', ')
        field.value = field.value.replace('$followers', stringFollowers)
      } else if ((field.value as string).includes('$follower')) {
        const follower = data.data[0].user_name
        field.value = field.value.replace('$follower', follower)
      }
      if ((field.value as string).includes('$streamer')) {
        const streamer = fields.at(0)?.value
        field.value = field.value.replace('$streamer', streamer)
      }
      if ((field.value as string).includes('$number')) {
        const number = data.total - currentFollowersNumb
        field.value = field.value.replace('$number', number)
      }
    }
  }

  private async updateFollowers(uuid: string, followers: number) {
    await Cache.updateOrCreate(
      {
        uuid: uuid,
      },
      {
        twitchFollowers: followers,
      }
    )
  }

  public async newFollowe(triggerApiOauth: any, event: any) {
    try {
      const triggerData = JSON.parse(event.trigger_interaction)
      const username = triggerData.fields[0].value
      const channelId = await this.fetchTwitchUserId(triggerApiOauth, username)
      const twitchData = await this.fetchTwitchData(triggerApiOauth, channelId)
      if (!twitchData) return
      const userCache = await Database.query().from('caches').where('uuid', event.uuid).first()
      if (
        !userCache ||
        !userCache.twitch_followers ||
        userCache.twitch_followers > twitchData.total
      ) {
        this.updateFollowers(event.uuid, twitchData.total)
        return
      }
      if (userCache.twitch_followers < twitchData.total) {
        const responseData = JSON.parse(event.response_interaction)
        const responseInteraction = responseData.id.toString() as ResponseInteraction
        const fields = JSON.parse(event.response_interaction).fields as APIEventField<any>[]
        this.useVariablesInFields(fields, twitchData, userCache.twitch_followers)
        for (const additionalAction of event.additional_actions) {
          this.useVariablesInFields(additionalAction.fields, twitchData, userCache.twitch_followers)
        }
        await eventHandler(responseInteraction, fields, event.response_api, event.uuid)
        await handleAdditionalActions(event)
        this.updateFollowers(event.uuid, twitchData.total)
      }
    } catch (error) {
      console.log(error)
    }
  }

  public async handle() {
    try {
      const events = await Database.query()
        .from('events')
        .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'followsStreamer'`)
      events
        .filter((event) => event.active)
        .map(async (event) => {
          const triggerApiOauth = await Database.query()
            .from('oauths')
            .where('uuid', event.trigger_api)
            .first()
          await this.newFollowe(triggerApiOauth, event)
        })
    } catch (error) {
      console.log(error)
    }
  }
}
