import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { RESPONSE_EVENTS } from 'App/params/responseEvents'
import { TRIGGER_EVENTS } from 'App/params/triggerEvents'

const getTriggerEventsOfAPI = (provider: string) => {
  return (TRIGGER_EVENTS.find((event) => event.provider === provider) || {}).interactions || []
}

const getResponseEventsOfAPI = (provider: string) => {
  return (RESPONSE_EVENTS.find((event) => event.provider === provider) || {}).interactions || []
}

export default class AboutController {
  public async info(ctx: HttpContextContract) {
    return ctx.response.ok({
      client: {
        host: ctx.request.ip(),
      },
      server: {
        current_time: Math.floor(new Date().getTime() / 1000),
        services: [
          {
            name: 'Spotify',
            actions: getTriggerEventsOfAPI('Spotify'),
            reactions: getResponseEventsOfAPI('Spotify'),
          },
          {
            name: 'Discord',
            actions: getTriggerEventsOfAPI('Discord'),
            reactions: getResponseEventsOfAPI('Discord'),
          },
          {
            name: 'Google',
            actions: getTriggerEventsOfAPI('Google'),
            reactions: getResponseEventsOfAPI('Google'),
          },
          {
            name: 'Github',
            actions: getTriggerEventsOfAPI('Github'),
            reactions: getResponseEventsOfAPI('Github'),
          },
          {
            name: 'Twitch',
            actions: getTriggerEventsOfAPI('Twitch'),
            reactions: getResponseEventsOfAPI('Twitch'),
          },
        ],
      },
    })
  }
}
