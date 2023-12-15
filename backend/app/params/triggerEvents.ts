import { APIEvent } from 'types/events'

export const TRIGGER_EVENTS: APIEvent[] = [
  {
    provider: 'google',
    name: 'Get the last email',
    fields: [['email', 'email for google']],
  },
  {
    provider: 'spotify',
    name: 'Tuto',
    fields: [['test', 'test description']],
  },
]
