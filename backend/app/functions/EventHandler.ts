import { APIEventField } from 'types/events'
import { discordEvent } from './DiscordEvent'
import { SendMailEvent } from './SendMailEvent'

export enum ResponseInteraction {
  SEND_EMAIL = 'sendEmail',
  SEND_DISCORD_MESSAGE = 'sendDiscordMessage',
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
  if (eventTrigger === ResponseInteraction.SEND_DISCORD_MESSAGE) {
    console.log(`[EventHandler] Sending message to Discord`)
    await discordEvent(content, responseApiUuid)
  }
  if (eventTrigger === ResponseInteraction.SEND_EMAIL) {
    console.log(`[EventHandler] Sending email`, content)
    await SendMailEvent(content, responseApiUuid)
  }
}
