import { APIEventField } from 'types/events'
import { discordEvent } from './DiscordEvent'
import { SendMailEvent } from './SendMailEvent'

export enum ResponseInteraction {
  SEND_EMAIL = 'sendEmail',
  SEND_DISCORD_MESSAGE = 'sendDiscordMessage',
}

export const eventHandler = async (
  eventTrigger: ResponseInteraction,
  content: APIEventField<any>[],
  responseApiUuid: string
) => {
  console.log(`[EventHandler] ${eventTrigger} triggered`)
  if (eventTrigger === ResponseInteraction.SEND_DISCORD_MESSAGE) {
    console.log(`[EventHandler] Sending message to Discord`)
    await discordEvent(content, responseApiUuid)
  }
  if (eventTrigger === ResponseInteraction.SEND_EMAIL) {
    console.log(`[EventHandler] Sending email`)
    await SendMailEvent(content, responseApiUuid)
  }
}
