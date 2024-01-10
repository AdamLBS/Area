import { APIEventField } from 'types/events'
import { discordWebhookEvent, discordPrivateMessageEvent } from './DiscordEvent'
import { SendMailEvent } from './SendMailEvent'

export enum ResponseInteraction {
  SEND_EMAIL = 'sendEmail',
  SEND_DISCORD_WEBHOOK_MESSAGE = 'sendDiscordWebhookMessage',
  SEND_DISCORD_PRIVATE_MESSAGE = 'sendDiscordPrivateMessage',
}

export const eventHandler = async (
  eventTrigger: ResponseInteraction,
  content: APIEventField<any>[],
  responseApiUuid: string
) => {
  console.log(`[EventHandler] ${eventTrigger} triggered`)
  if (eventTrigger === ResponseInteraction.SEND_DISCORD_WEBHOOK_MESSAGE) {
    console.log(`[EventHandler] Sending message to Discord`)
    await discordWebhookEvent(content)
  }
  if (eventTrigger === ResponseInteraction.SEND_DISCORD_PRIVATE_MESSAGE) {
    console.log(`[EventHandler] Sending private message to Discord`)
    await discordPrivateMessageEvent(content, responseApiUuid)
  }
  if (eventTrigger === ResponseInteraction.SEND_EMAIL) {
    console.log(`[EventHandler] Sending email`)
    await SendMailEvent(content, responseApiUuid)
  }
}
