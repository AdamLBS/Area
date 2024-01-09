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
        fields: [],
        variables: {
          streamer: 'Name of the streamer',
          title: 'Title of the stream',
          game: 'Name of the game',
          url: 'Url of the stream',
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
            value: 'repository url',
            name: 'commitsUrl',
            type: 'input',
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
            value: 'repository url',
            name: 'repositoryUrl',
            type: 'input',
            required: true,
          },
          {
            value: 'branch main or reference',
            name: 'reference',
            type: 'input',
            required: true,
          },
          {
            value: 'Select the state of the CI/CD',
            name: 'state',
            type: 'select',
            values: [
              {
                value: 'success',
                label: 'Success',
              },
              {
                value: 'failure',
                label: 'Failure',
              },
              {
                value: 'pending',
                label: 'Pending',
              },
            ],
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
