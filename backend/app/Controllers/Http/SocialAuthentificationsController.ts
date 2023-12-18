import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

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
}
