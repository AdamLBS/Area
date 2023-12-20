import { APIEvent } from 'types/events'

export const RESPONSE_EVENTS: APIEvent[] = [
  {
    provider: 'Discord',
    id: 'sendMessage',
    name: 'Send message',
    fields: {
      message: 'Content of the message',
    },
  },
  {
    provider: 'Google',
    id: 'sendEmail',
    name: 'Send email',
    fields: {
      email: 'Email of the recipient',
    },
  },
]
