import { APIEvent } from 'types/events'

export const TRIGGER_EVENTS: APIEvent[] = [
  {
    provider: 'Spotify',
    interactions: [
      {
        id: 'listenMusic',
        name: 'Changes music',
        fields: [],
      },
      {
        id: 'likeSong',
        name: 'Like a song',
        fields: [],
      },
    ],
  },
  {
    provider: 'Twitch',
    interactions: [
      {
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
    ],
  },
  {
    provider: 'Github',
    interactions: [
      {
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
      {
        id: 'checkCICD',
        name: 'Check CI/CD of the last commit',
        fields: [
          {
            value: '',
            name: 'repositoryUrl',
            required: true,
          },
          {
            value: '',
            name: 'reference',
            required: true,
          },
          {
            value: 'success' || 'failure' || 'pending',
            name: 'state',
            required: true,
          },
        ],
      },
    ],
  },
]
