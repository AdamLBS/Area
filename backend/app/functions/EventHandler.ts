import { APIEventField } from 'types/events'
import { discordWebhookEvent, discordPrivateMessageEvent } from './DiscordEvent'
import { SendMailEvent } from './SendMailEvent'
import ResponseEventFailedException from 'App/Exceptions/ResponseEventFailedException'
import Log from 'App/Models/Log'
import { makeAnnounceEvent } from './MakeAnnounceEvent'
import {
  pauseSong,
  playSong,
  repeatSong,
  setPlaybackVolume,
  skipToNextSong,
  skipToPreviousSong,
  toggleShuffle,
} from './SpotifyEvents'

export enum ResponseInteraction {
  SEND_EMAIL = 'sendEmail',
  SEND_DISCORD_WEBHOOK_MESSAGE = 'sendDiscordWebhookMessage',
  SEND_DISCORD_PRIVATE_MESSAGE = 'sendDiscordPrivateMessage',
  MAKE_ANNOUNCE = 'makeAnnounce',
  PLAY_SONG = 'playSong',
  PAUSE_SONG = 'pauseSong',
  SKIP_TO_NEXT_SONG = 'skipToNextSong',
  SKIP_TO_PREVIOUS_SONG = 'skipToPreviousSong',
  REPEAT_SONG = 'repeatSong',
  SET_PLAYBACK_VOLUME = 'setPlaybackVolume',
  TOGGLE_SHUFFLE = 'toggleShuffle',
}

export const handleAdditionalActions = async (event: any) => {
  for (const additionalAction of event.additional_actions) {
    const responseInteraction = additionalAction.id as ResponseInteraction
    await eventHandler(responseInteraction, additionalAction.fields, event.response_api, event.uuid)
  }
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
  switch (eventTrigger) {
    case ResponseInteraction.SEND_EMAIL:
      try {
        await SendMailEvent(content, responseApiUuid)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    case ResponseInteraction.SEND_DISCORD_WEBHOOK_MESSAGE:
      try {
        await discordWebhookEvent(content)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    case ResponseInteraction.SEND_DISCORD_PRIVATE_MESSAGE:
      try {
        await discordPrivateMessageEvent(content, responseApiUuid)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    case ResponseInteraction.MAKE_ANNOUNCE:
      try {
        await makeAnnounceEvent(content, responseApiUuid)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    case ResponseInteraction.PLAY_SONG:
      try {
        await playSong(responseApiUuid)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    case ResponseInteraction.PAUSE_SONG:
      try {
        await pauseSong(responseApiUuid)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    case ResponseInteraction.SKIP_TO_NEXT_SONG:
      try {
        await skipToNextSong(responseApiUuid)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    case ResponseInteraction.SKIP_TO_PREVIOUS_SONG:
      try {
        await skipToPreviousSong(responseApiUuid)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    case ResponseInteraction.REPEAT_SONG:
      try {
        await repeatSong(responseApiUuid)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    case ResponseInteraction.SET_PLAYBACK_VOLUME:
      try {
        await setPlaybackVolume(content, responseApiUuid)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    case ResponseInteraction.TOGGLE_SHUFFLE:
      try {
        await toggleShuffle(content, responseApiUuid)
        await createLog('Message sent to Discord', eventUuid)
      } catch (error) {
        console.error(error)
        throw new ResponseEventFailedException('Failed to send email', eventUuid)
      }
      break
    default:
      break
  }
}
