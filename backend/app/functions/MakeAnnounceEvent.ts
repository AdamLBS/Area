import axios from 'axios'
import { APIEventField } from 'types/events'
import Oauth from 'App/Models/Oauth'

const fetchTwitchUserId = async (token: string | null): Promise<string> => {
  const repose = await axios.get('https://api.twitch.tv/helix/users', {
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${token}`,
    },
  })
  return repose.data.data[0].id
}

const fetchTwitchChannelrId = async (token: string | null, login: string): Promise<string> => {
  const repose = await axios.get('https://api.twitch.tv/helix/users', {
    headers: {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      'Authorization': `Bearer ${token}`,
    },
    params: {
      login: login,
    },
  })
  return repose.data.data[0].id
}

export const makeAnnounceEvent = async (data: APIEventField<any>[], responseApiUuid: string) => {
  const message = data.at(1)?.value
  const color = data.at(2)?.value
  const oauth = await Oauth.findByOrFail('uuid', responseApiUuid)
  const moderator = await fetchTwitchUserId(oauth.token)
  const channel = await fetchTwitchChannelrId(oauth.token, data.at(0)?.value)
  await axios.post(
    'https://api.twitch.tv/helix/chat/announcements',
    {
      message: message,
      color: color,
    },
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${oauth.token}`,
      },
      params: {
        broadcaster_id: channel,
        moderator_id: moderator,
      },
    }
  )
}
