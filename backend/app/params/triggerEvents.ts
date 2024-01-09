import { APIEvent } from 'types/events'

export const TRIGGER_EVENTS: APIEvent[] = [
  {
    provider: 'Spotify',
    interactions: [
      {
        id: 'listenMusic',
        name: 'Changes music',
        fields: [],
        variables: {
          artist: 'Name of the artist',
          song: 'Name of the song',
        },
      },
      {
        id: 'likeSong',
        name: 'Like a song',
        fields: [],
        variables: {
          artist: 'Name of the artist',
          song: 'Name of the song',
        },
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
        variables: {
          streamer: 'Name of the streamer',
        },
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
        variables: {
          commitsUrl: 'Url of the commit',
        },
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
        variables: {
          repositoryUrl: 'Url of the repository',
          reference: 'Reference of the commit',
          state: 'State of the CI/CD',
        },
      },
    ],
  },
]
