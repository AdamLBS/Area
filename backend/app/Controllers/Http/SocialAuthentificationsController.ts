import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from '@ioc:Adonis/Core/Config'

export default class SocialAuthentificationsController {
  public async redirect({ ally, params }: HttpContextContract) {
    await ally.use(params.provider).redirect()
  }

  public async callback({ ally, params }: HttpContextContract) {
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

    return user
  }
}
