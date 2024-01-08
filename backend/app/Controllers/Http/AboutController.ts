import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

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
            actions: [],
            reactions: [],
          },
          {
            name: 'Discord',
            actions: [],
            reactions: [],
          },
          {
            name: 'Google',
            actions: [],
            reactions: [],
          },
        ],
      },
    })
  }
}
