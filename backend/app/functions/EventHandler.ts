import { APIEventField } from 'types/events'
import { discordWebhookEvent, discordPrivateMessageEvent } from './DiscordEvent'
import { SendMailEvent } from './SendMailEvent'
import { makeAnnounceEvent } from './MakeAnnounceEvent'

export enum ResponseInteraction {
  SEND_EMAIL = 'sendEmail',
  SEND_DISCORD_WEBHOOK_MESSAGE = 'sendDiscordWebhookMessage',
  SEND_DISCORD_PRIVATE_MESSAGE = 'sendDiscordPrivateMessage',
  MAKE_ANNOUNCE = 'makeAnnounce',
}

export const handleAdditionalActions = async (event: any) => {
  for (const additionalAction of event.additional_actions) {
    const responseInteraction = additionalAction.id as ResponseInteraction
    await eventHandler(responseInteraction, additionalAction.fields, event.response_api)
  }
}

export const eventHandler = async (
  eventTrigger: ResponseInteraction,
  content: APIEventField<any>[],
  responseApiUuid: string
) => {
  console.log(`[EventHandler] ${eventTrigger} triggered`)
  switch (eventTrigger) {
    case ResponseInteraction.SEND_EMAIL:
      await SendMailEvent(content, responseApiUuid)
      break
    case ResponseInteraction.SEND_DISCORD_WEBHOOK_MESSAGE:
      await discordWebhookEvent(content)
      break
    case ResponseInteraction.SEND_DISCORD_PRIVATE_MESSAGE:
      await discordPrivateMessageEvent(content, responseApiUuid)
      break
    case ResponseInteraction.MAKE_ANNOUNCE:
      await makeAnnounceEvent(content, responseApiUuid)
      break
    default:
      break
  }
}
