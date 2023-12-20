import { APIEvent } from 'types/events'

export const TRIGGER_EVENTS: APIEvent[] = [
  {
    provider: 'Spotify',
    id: 'listenMusic',
    name: 'Changes music',
    fields: {},
  },
  {
    provider: 'Twitch',
    id: 'startsLive',
    name: 'Streamer starts to live',
    fields: {
      streamer: 'zerator',
      username: 'gab',
    },
  },
]
