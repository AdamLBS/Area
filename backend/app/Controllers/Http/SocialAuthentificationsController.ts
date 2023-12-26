import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'
import OAuthValidator from 'App/Validators/OAuthValidator'

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

    const { token } = user

    return response.ok({
      message: {
        token: token.token,
        refreshToken: token.refreshToken,
        provider: params.provider,
      },
    })
  }
  public async save({ auth, response, request }: HttpContextContract) {
    const loggedUser = await auth.authenticate()

    if (!loggedUser) {
      return response.unauthorized({ message: 'You must be logged in to access this resource' })
    }

    const payload = await request.validate(OAuthValidator)

    await Oauth.updateOrCreate(
      {
        userUuid: loggedUser.uuid,
        provider: request.param('provider'),
      },
      payload
    )
      .then((oauth) => {
        return response.ok({
          message: 'Oauth saved successfully',
          oauth,
        })
      })
      .catch((error) => {
        return response.badRequest({
          message: 'An error occured while saving the oauth',
          error,
        })
      })
  }

  public async delete({ auth, response, request }: HttpContextContract) {
    const loggedUser = await auth.authenticate()

    if (!loggedUser) {
      return response.unauthorized({ message: 'You must be logged in to access this resource' })
    }

    const provider = request.param('provider')

    await Oauth.query()
      .where('user_uuid', loggedUser.uuid)
      .where('provider', provider)
      .delete()
      .then(() => {
        return response.ok({
          message: 'Oauth deleted successfully',
        })
      })
      .catch((error) => {
        return response.badRequest({
          message: 'An error occured while deleting the oauth',
          error,
        })
      })
  }
}
