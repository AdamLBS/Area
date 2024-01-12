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
        fields: [],
        variables: {
          streamer: 'Name of the streamer',
          streamUrl: 'Url of the stream',
        },
      },
      {
        id: 'followsStreamer',
        name: 'User starts following a streamer',
        fields: [
          {
            value: 'Streamer name (you must be a moderator)',
            name: 'streamer',
            type: 'input',
            required: true,
          },
        ],
        variables: {
          follower: 'Name of the last follower',
          followers: 'Name of the last followers',
          number: 'Number of new followers',
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
  {
    provider: 'Timer',
    interactions: [
      {
        id: 'everyDayTimer',
        name: 'Every Day at one hour',
        fields: [
          {
            value: 'Hour with format HH:MM',
            name: 'Hour',
            type: 'input',
            required: true,
          },
        ],
        variables: {},
      },
    ],
  },
  {
    provider: 'Crypto',
    interactions: [
      {
        id: 'cryptoPrice',
        name: 'Crypto price monitoring',
        fields: [
          {
            value: 'Select the crypto',
            name: 'Crypto',
            type: 'select',
            values: [
              {
                value: 'BTC',
                label: 'BTC',
              },
              {
                value: 'ETH',
                label: 'ETH',
              },
              {
                value: 'LTC',
                label: 'LTC',
              },
            ],
            required: true,
          },
          {
            value: 'Select the currency',
            name: 'Currency',
            type: 'select',
            values: [
              {
                value: 'USD',
                label: 'Dollar',
              },
              {
                value: 'EUR',
                label: 'Euro',
              },
            ],
            required: true,
          },
          {
            value: 'Minimum',
            name: 'Minimum price of the crypto',
            type: 'input',
            required: true,
          },
          {
            value: 'Maximum',
            name: 'Maximum price of the crypto',
            type: 'input',
            required: true,
          },
        ],
        variables: {
          crypto: 'Name of the crypto',
          amount: 'Actual value of the crypto',
          currency: 'Currency of the crypto',
        },
      },
    ],
  },
]
