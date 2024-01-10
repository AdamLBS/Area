import { APIEvent } from 'types/events'

export const TRIGGER_EVENTS: APIEvent[] = [
  {
    provider: 'Spotify',
    interactions: [
      {
        id: 'listenMusic',
        name: 'When I start listening to music',
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
      {
        id: 'changeSong',
        name: 'When I change song',
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
            type: 'input',
            required: true,
          },
          {
            value: 'Name of the user',
            name: 'username',
            type: 'input',
            required: true,
          },
        ],
        variables: {
          streamer: 'Name of the streamer',
          streamUrl: 'Url of the stream',
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
            value: 'Repository url',
            name: 'commitsUrl',
            type: 'input',
            required: true,
          },
        ],
        variables: {
          commitUrl: 'Url of the commit',
          commitMsg: 'Message of the commit',
          commitAuthor: 'Author of the commit',
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
