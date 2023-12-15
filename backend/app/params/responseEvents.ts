import { APIEvent } from 'types/events'

export const RESPONSE_EVENTS: APIEvent[] = [
  {
    provider: 'spotify',
    name: 'Play music',
    fields: [['musicName', 'name of the music']],
  },
  {
    provider: 'discord',
    name: 'Send message',
    fields: [['message', 'content of the message']],
  },
]
