import { APIEventField } from 'types/events'
import { discordEvent } from './DiscordEvent'
import { SendMailEvent } from './SendMailEvent'
import ResponseEventFailedException from 'App/Exceptions/ResponseEventFailedException'
import Log from 'App/Models/Log'

export enum ResponseInteraction {
  SEND_EMAIL = 'sendEmail',
  SEND_DISCORD_MESSAGE = 'sendDiscordMessage',
}

const createLog = async (message: string, eventUuid: string) => {
  await Log.create({
    message,
    status: 'success',
    eventUuid,
  })
}

export const eventHandler = async (
  eventTrigger: ResponseInteraction,
  content: APIEventField<any>[],
  responseApiUuid: string,
  eventUuid: string
) => {
  console.log(`[EventHandler] ${eventTrigger} triggered`)
  if (eventTrigger === ResponseInteraction.SEND_DISCORD_MESSAGE) {
    console.log(`[EventHandler] Sending message to Discord`)
    try {
      await discordEvent(content, responseApiUuid)
      await createLog('Message sent to Discord', eventUuid)
    } catch (error) {
      console.error(error)
      throw new ResponseEventFailedException('Failed to send message to Discord', eventUuid)
    }
  }
  if (eventTrigger === ResponseInteraction.SEND_EMAIL) {
    console.log(`[EventHandler] Sending email`)
    try {
      await SendMailEvent(content, responseApiUuid)
      await createLog('Email sent', eventUuid)
    } catch (error) {
      console.error(error)
      throw new ResponseEventFailedException('Failed to send email', eventUuid)
    }
  }
}
