import { APIEvent } from 'types/events'

export const TRIGGER_EVENTS: APIEvent[] = [
  {
    provider: 'spotify',
    id: 'listenMusic',
    name: 'Changes music',
    fields: {},
  },
  {
    provider: 'twitch',
    id: 'startsLive',
    name: 'Streamer starts to live',
    fields: {
      streamer: 'zerator',
      username: 'gab',
    },
  },
]
