import { APIEventField } from 'types/events'
import { discordWebhookEvent, discordPrivateMessageEvent } from './DiscordEvent'
import { SendMailEvent } from './SendMailEvent'
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
    case ResponseInteraction.PLAY_SONG:
      await playSong(responseApiUuid)
      break
    case ResponseInteraction.PAUSE_SONG:
      await pauseSong(responseApiUuid)
      break
    case ResponseInteraction.SKIP_TO_NEXT_SONG:
      await skipToNextSong(responseApiUuid)
      break
    case ResponseInteraction.SKIP_TO_PREVIOUS_SONG:
      await skipToPreviousSong(responseApiUuid)
      break
    case ResponseInteraction.REPEAT_SONG:
      await repeatSong(responseApiUuid)
      break
    case ResponseInteraction.SET_PLAYBACK_VOLUME:
      await setPlaybackVolume(content, responseApiUuid)
      break
    case ResponseInteraction.TOGGLE_SHUFFLE:
      await toggleShuffle(content, responseApiUuid)
      break
    default:
      break
  }
}
