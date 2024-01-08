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
        value: 'Zerator',
        name: 'streamer',
        required: true,
      },
      {
        value: 'gab',
        name: 'username',
        required: true,
      },
    ],
  },
  {
    provider: 'Github',
    id: 'newCommit',
    name: 'New commit',
    fields: [
      {
        value: '',
        name: 'commitsUrl',
        required: true,
      },
    ],
  },
]
