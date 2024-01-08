import { APIEvent } from 'types/events'

export const TRIGGER_EVENTS: APIEvent[] = [
  {
    provider: 'Spotify',
    id: 'listenMusic',
    name: 'Changes music',
    fields: [],
  },
  {
    provider: 'Twitch',
    id: 'startsLive',
    name: 'Streamer starts to live',
    fields: [
      {
        value: 'Name of the streamer',
        name: 'streamer',
        required: true,
      },
      {
        value: 'Name of the user',
        name: 'username',
        required: true,
      },
    ],
  },
]
