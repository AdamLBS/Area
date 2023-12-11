import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'

export default class SocialAuthentificationsController {
  public async redirect({ ally, params }: HttpContextContract) {
    await ally.use(params.provider).redirect()
  }

  public async callback({ ally, params, auth }: HttpContextContract) {
    const service = ally.use(params.provider)
    const userLogged = await auth.user

    // if (!userLogged) {
    //   return 'You must be logged in to complete this action'
    // } // TODO

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

    let oauthToken = false //await Oauth.query().where('user_uuid', userLogged.uuid).first()

    console.log('test token: ', token)

    if (!oauthToken) {
      await Oauth.firstOrCreate({
        userUuid: 'test',
        token: token.token,
        refreshToken: token.refreshToken,
        provider: params.provider,
      })
    }

    console.log(user)

    return user
  }
}
