import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthValidator from 'App/Validators/User/AuthValidator'
import RegisterValidator from 'App/Validators/User/RegisterValidator'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.firstOrCreate(payload)

    await auth.use('web').login(user)

    const userToken = await auth.use('api').generate(user, {
      expiresIn: '7 days',
    })

    return response.ok({
      message: 'User signed up successfully',
      token: userToken.token,
    })
  }

  public async me({ auth, response }: HttpContextContract) {
    const user = await auth.authenticate()

    return response.ok({
      user,
    })
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(AuthValidator)

    await auth.attempt(email, password)
    const user = await auth.authenticate()
    const userToken = await auth.use('api').generate(user, {
      expiresIn: '7 days',
    })

    return response.ok({
      message: 'User logged in successfully',
      token: userToken.token,
    })
  }

  public async logout({ response, auth }: HttpContextContract) {
    await auth.logout()

    return response.ok({
      message: 'User logged out successfully',
    })
  }

  public async checkIfEmailExists({ request, response }: HttpContextContract) {
    const { email } = request.body()

    if (!email) {
      return response.notAcceptable({
        message: 'Email is required',
      })
    }

    const user = await User.query().where('email', email).first()

    if (user) {
      return response.ok(true)
    }
    return response.ok(false)
  }
}
