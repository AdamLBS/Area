import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'
import DiscordWebhookValidator from 'App/Validators/Services/DiscordWebhookValidator'

export default class DiscordsController {
  public async add({ request, response, auth }: HttpContextContract) {
    const { webhookLink } = await request.validate(DiscordWebhookValidator)
    const user = auth.user
    if (!user) {
      return response.unauthorized({ message: 'You must be logged in to access this resource' })
    }
    const socialAuth = await Oauth.query()
      .where('user_uuid', user.uuid)
      .where('provider', 'discord')
      .first()
    if (socialAuth) {
      await Oauth.updateOrCreate(
        {
          userUuid: user.uuid,
          provider: 'discord',
        },
        {
          webhook: webhookLink,
        }
      )
    } else {
      await Oauth.firstOrCreate({
        userUuid: user.uuid,
        provider: 'discord',
        webhook: webhookLink,
      })
    }
  }
}
