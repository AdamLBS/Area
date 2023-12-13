import { discordEvent } from './DiscordEvent'

export enum ResponseInteraction {
  SEND_EMAIL = 'send_email',
  SEND_DISCORD_MESSAGE = 'send_discord_message',
}

export type Content = {
  title: string
  message: string
  url?: string
}

export const eventHandler = async (
  eventTrigger: ResponseInteraction,
  content: Content,
  oauth_service_uuid: string
) => {
  console.log(`[EventHandler] ${eventTrigger} triggered`)
  if (eventTrigger === ResponseInteraction.SEND_DISCORD_MESSAGE) {
    console.log(`[EventHandler] Sending message to Discord`)
    await discordEvent(content, oauth_service_uuid)
  }
}
