import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SocialAuthentificationsController {
  public async redirect({ ally, params }: HttpContextContract) {
    await ally.use(params.provider).redirect()
  }

  public async callback({ ally, params }: HttpContextContract) {
    const service = ally.use(params.provider)

    if (service.accessDenied()) {
      throw 'Access was denied' // TODO: add a better exception
    }

    const user = await service.user()

    console.log(user)

    return user
  }
}
