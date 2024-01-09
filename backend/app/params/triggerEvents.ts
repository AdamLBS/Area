import { APIEvent } from 'types/events'

export const TRIGGER_EVENTS: APIEvent[] = [
  {
    provider: 'Spotify',
    id: 'listenMusic',
    name: 'Changes music',
    fields: [],
    variables: {
      artist: 'Name of the artist',
      song: 'Name of the song',
    },
  },
  {
    provider: 'Spotify',
    id: 'likeSong',
    name: 'Like a song',
    fields: [],
    variables: {
      artist: 'Name of the artist',
      song: 'Name of the song',
    },
  },
  {
    provider: 'Twitch',
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
    },
  },
  {
    provider: 'Github',
    id: 'newCommit',
    name: 'New commit',
    fields: [
      {
        value: 'repository url',
        name: 'repositoryUrl',
        type: 'input',
        required: true,
      },
    ],
    variables: {
      commitsUrl: 'Url of the commit',
    },
  },
  {
    provider: 'Github',
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
        value: '',
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
]
