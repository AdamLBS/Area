import { APIEvent } from 'types/events'

export const RESPONSE_EVENTS: APIEvent[] = [
  {
    provider: 'Discord',
    interactions: [
      {
        id: 'sendMessage',
        name: 'Send message',
        fields: [
          {
            value: 'Content of the message',
            name: 'message',
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
            required: true
          }
        ],
        variables: {},
      },
    ],
  },
]
