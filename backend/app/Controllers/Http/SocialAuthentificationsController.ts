import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'

export default class SocialAuthentificationsController {
  public async redirect({ ally, params }: HttpContextContract) {
    await ally.use(params.provider).redirect()
  }

  public async callback({ ally, params, auth, response }: HttpContextContract) {
    const service = ally.use(params.provider)
    const loggedUser = auth.user

    // if (!loggedUser) {
    //   return response.unauthorized({ message: 'You must be logged in to access this resource' })
    // }

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

    await Oauth.updateOrCreate(
      {
        userUuid: 'test',
        provider: params.provider,
      },
      {
        token: token.token,
        refreshToken: token.refreshToken,
        oauthUserId: id,
      }
    )

    return response.ok({
      message: `This ${params.provider} account has been linked successfully.`,
    })
  }
}
