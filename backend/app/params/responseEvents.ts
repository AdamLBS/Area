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
        type: 'textarea',
        required: true,
      },
    ],
    variables: {},
  },
  {
    provider: 'Google',
    id: 'sendEmail',
    name: 'Send email',
    fields: [
      {
        value: 'Email of the recipient',
        name: 'email',
        type: 'input',
        required: true,
      },
    ],
    variables: {},
  },
]
