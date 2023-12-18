import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'

export default class SocialAuthentificationsController {
  public async redirect({ ally, params }: HttpContextContract) {
    await ally.use(params.provider).redirect()
  }

  public async callback({ ally, params, response }: HttpContextContract) {
    const service = ally.use(params.provider)

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

    const { token, id } = user

    return response.ok({
      message: {
        token: token.token,
        refreshToken: token.refreshToken,
        oauthUserId: id,
      },
    })

  }
  public async save({ params, auth, response }: HttpContextContract) {
    const loggedUser  = await auth.authenticate()
    if (!loggedUser) {
      return 'You need to be logged in to do this'
    }

    if (!loggedUser) {
      return response.unauthorized({ message: 'You must be logged in to access this resource' })
    }

    await Oauth.updateOrCreate(
      {
        userUuid: loggedUser.uuid,
        provider: params.provider,
      },
      {
        token: params.token,
        refreshToken: params.refreshToken,
        oauthUserId: params.oauthUserId,
      }
    )
  }
}
