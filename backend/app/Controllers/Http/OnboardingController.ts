import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'
import User from 'App/Models/User'
import Event from 'App/Models/Event'
import Log from 'App/Models/Log'

export default class OnboardingController {
  public async startOnboarding({ auth, response }: HttpContextContract) {
    const user = auth.user
    const userDb = await User.findByOrFail('uuid', user?.uuid)
    if (!userDb) {
      throw new Error('User not found')
    }
    await User.updateOrCreate({ uuid: userDb.uuid }, { onboarding: '1' })
    return response.ok({
      message: 'Onboarding started',
    })
  }
  public async getOnboardingStep({ auth, response }: HttpContextContract) {
    const user = auth.user
    let userDb = await User.findByOrFail('uuid', user?.uuid)
    if (!userDb) {
      throw new Error('User not found')
    }
    if (userDb.onboarding === '5') {
      userDb = await User.updateOrCreate({ uuid: userDb.uuid }, { onboarding: '6' })
      return response.ok({
        step: '5',
      })
    }
    if (userDb.onboarding === '6') {
      return response.ok({
        step: userDb.onboarding,
      })
    }

    const oauth = await Oauth.query().where('user_uuid', userDb.uuid)
    const events = await Event.query().where('user_uuid', userDb.uuid)
    let hasLog = false
    events.map(async (event) => {
      const log = await Log.query().where('event', event.uuid)
      if (log.length > 0) {
        hasLog = true
      }
    })

    if (oauth.length > 2) {
      await User.updateOrCreate({ uuid: userDb.uuid }, { onboarding: '2' })
    } else if (userDb.onboarding) {
      await User.updateOrCreate({ uuid: userDb.uuid }, { onboarding: '1' })
    }
    if (events.length > 0) {
      await User.updateOrCreate({ uuid: userDb.uuid }, { onboarding: '3' })
    }
    if (hasLog) {
      await User.updateOrCreate({ uuid: userDb.uuid }, { onboarding: '4' })
    }
    userDb = await User.findByOrFail('uuid', user?.uuid)

    return response.ok({
      step: userDb.onboarding,
    })
  }
  public async finishOnboarding({ auth, response }: HttpContextContract) {
    const user = auth.user
    const userDb = await User.findByOrFail('uuid', user?.uuid)

    if (!userDb) {
      throw new Error('User not found')
    }
    await User.updateOrCreate({ uuid: userDb.uuid }, { onboarding: '5' })

    return response.ok({
      message: 'Onboarding step updated',
    })
  }
}
