import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class OnboardingController {
  public async startOnboarding({ auth, response }: HttpContextContract) {
    const user = await auth.user
    const userDb = await User.findByOrFail('uuid', user?.uuid)
    if (!userDb) {
      throw new Error('User not found')
    }
    await User.updateOrCreate({ uuid: userDb.uuid }, { onboarding: 1 })
    return response.ok({
      message: 'Onboarding started',
    })
  }
  public async getOnboardingStep({ auth, response }: HttpContextContract) {
    const user = await auth.user
    const userDb = await User.findByOrFail('uuid', user?.uuid)
    if (!userDb) {
      throw new Error('User not found')
    }
    return response.ok({
      step: userDb.onboarding,
    })
  }
  public async updateOnboardingStep({ auth, request, response }: HttpContextContract) {
    const user = await auth.user
    const userDb = await User.findByOrFail('uuid', user?.uuid)
    const { step } = await request.body()
    if (!userDb) {
      throw new Error('User not found')
    }
    const stepNumber = step === 4 ? null : step
    await User.updateOrCreate({ uuid: userDb.uuid }, { onboarding: stepNumber })
    return response.ok({
      message: 'Onboarding step updated',
    })
  }
}
