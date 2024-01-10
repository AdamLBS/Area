import axios from 'axios'
import { APIEventField } from 'types/events'

export const discordWebhookEvent = async (data: APIEventField<any>[]) => {
  const webhook = data.at(0)?.value
  const ping = data.at(1)?.value === 'none' ? '' : data.at(1)?.value
  const message = data.at(2)?.value
  try {
    await axios.post(webhook, {
      content: `${ping} ${message}`,
    })
  } catch (error) {
    console.log(error)
  }
}

export const discordPrivateMessageEvent = async (
  data: APIEventField<any>[],
  responseApiUuid: string
) => {
  console.log(data)
  console.log(responseApiUuid)
}
