import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthValidator from 'App/Validators/User/AuthValidator'
import RegisterValidator from 'App/Validators/User/RegisterValidator'

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.firstOrCreate(payload)

    return response.created(user)
  }

  public async me({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate()

    return response.ok({
      user,
    })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(AuthValidator)

    const token = await auth.attempt(email, password)

    return response.ok({
      token,
    })
  }
}
