import { APIEvent } from 'types/events'

export const RESPONSE_EVENTS: APIEvent[] = [
  {
    provider: 'Discord',
    interactions: [
      {
        id: 'sendDiscordWebhookMessage',
        name: 'Send webhook message',
        fields: [
          {
            value: 'Webhook url',
            name: 'webhook',
            type: 'input',
            required: true,
          },
          {
            value: 'Select who to ping',
            name: 'Ping who?',
            type: 'select',
            values: [
              {
                value: '@everyone',
                label: 'Everyone',
              },
              {
                value: '@here',
                label: 'Here',
              },
              {
                value: 'none',
                label: 'None',
              },
            ],
            required: true,
          },
          {
            value: 'Content of the message',
            name: 'message',
            type: 'input',
            required: true,
          },
          {
            value: 'URL of the webhook',
            name: 'webhook',
            type: 'input',
            required: true,
          },
        ],
        variables: {},
      },
    ],
  },
  {
    provider: 'Google',
    interactions: [
      {
        id: 'sendEmail',
        name: 'Send email',
        fields: [
          {
            value: 'Email of the recipient',
            name: 'email',
            type: 'input',
            required: true,
          },
          {
            value: 'Subject of the email',
            name: 'subject',
            type: 'input',
            required: true,
          },
          {
            value: 'Body of the email',
            name: 'body',
            type: 'input',
            required: true,
          },
        ],
        variables: {},
      },
    ],
  },
  {
    provider: 'Twitch',
    interactions: [
      {
        id: 'makeAnnounce',
        name: 'Make a stream chat announce',
        fields: [
          {
            value: 'Streamer name (you must be a moderator)',
            name: 'streamer',
            type: 'input',
            required: true,
          },
          {
            value: 'Message',
            name: 'message',
            type: 'input',
            required: true,
          },
          {
            value: 'Announcement color',
            name: 'color',
            type: 'select',
            values: [
              {
                value: 'primary',
                label: 'Primary',
              },
              {
                value: 'purple',
                label: 'Purple',
              },
              {
                value: 'blue',
                label: 'Blue',
              },
              {
                value: 'green',
                label: 'Green',
              },
              {
                value: 'orange',
                label: 'Orange',
              },
            ],
            required: true,
          },
        ],
        variables: {},
      },
    ],
  },
  {
    provider: 'Spotify',
    interactions: [
      {
        id: 'playSong',
        name: 'Play song',
        fields: [],
        variables: {},
      },
      {
        id: 'pauseSong',
        name: 'Pause song',
        fields: [],
        variables: {},
      },
      {
        id: 'skipToNextSong',
        name: 'Skip to next song',
        fields: [],
        variables: {},
      },
      {
        id: 'skipToPreviousSong',
        name: 'Skip to previous song',
        fields: [],
        variables: {},
      },
      {
        id: 'repeatSong',
        name: 'Repeat song',
        fields: [],
        variables: {},
      },
      {
        id: 'setPlaybackVolume',
        name: 'Set playback volume',
        fields: [
          {
            value: 'Volume in percent (0-100)',
            name: 'volume',
            type: 'input',
            required: true,
          },
        ],
        variables: {},
      },
      {
        id: 'toggleShuffle',
        name: 'Toggle shuffle',
        fields: [
          {
            value: 'Shuffle',
            name: 'shuffle',
            type: 'select',
            values: [
              {
                value: 'on',
                label: 'On',
              },
              {
                value: 'off',
                label: 'Off',
              },
            ],
            required: true,
          },
        ],
        variables: {},
      },
    ],
  },
]
