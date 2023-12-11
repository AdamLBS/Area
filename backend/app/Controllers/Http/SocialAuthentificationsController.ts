import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'

export default class SocialAuthentificationsController {
  public async redirect({ ally, params }: HttpContextContract) {
    await ally.use(params.provider).redirect()
  }

  public async callback({ ally, params, auth, response }: HttpContextContract) {
    const service = ally.use(params.provider)
    const userLogged = await auth.user

    if (!userLogged) {
      return response.unauthorized({ message: 'You must be logged in to complete this action' })
    }

    if (service.accessDenied()) {
      return 'Access was denied'
    }

    if (service.stateMisMatch()) {
      return 'Request origin could not be verified'
    }

    if (service.hasError()) {
      return service.getError()
    }

    const user = await service.user()

    const { token } = user

    let oauthToken = await Oauth.query().where('user_uuid', userLogged.uuid).first()

    if (!oauthToken) {
      await Oauth.firstOrCreate({
        userUuid: userLogged.uuid,
        token: token.token,
        refreshToken: token.refreshToken,
        provider: params.provider,
      })
      return response.ok({
        message: `${params.provider} account linked successfully`,
      })
    } else {
      return response.unauthorized({
        message: `${params.provider} account already linked`,
      })
    }
  }
}
