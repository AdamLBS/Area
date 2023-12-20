import { APIEvent } from 'types/events'

export const RESPONSE_EVENTS: APIEvent[] = [
  {
    provider: 'discord',
    id: 'sendMessage',
    name: 'Send message',
    fields: {
      message: 'Content of the message',
    },
  },
  {
    provider: 'google',
    id: 'sendEmail',
    name: 'Send email',
    fields: {
      email: 'Email of the recipient',
    },
  },
]
