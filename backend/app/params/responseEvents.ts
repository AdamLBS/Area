import { APIEvent } from 'types/events'

export const RESPONSE_EVENTS: APIEvent[] = [
  {
    provider: 'Discord',
    id: 'sendMessage',
    name: 'Send message',
    fields: [
      {
        value: 'Content of the message',
        name: 'message',
        required: true,
      },
    ],
  },
  {
    provider: 'Google',
    id: 'sendEmail',
    name: 'Send email',
    fields: [
      {
        value: 'Email of the recipient',
        name: 'email',
        required: true,
      },
    ],
  },
]
