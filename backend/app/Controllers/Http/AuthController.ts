import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthValidator from 'App/Validators/User/AuthValidator'
import RegisterValidator from 'App/Validators/User/RegisterValidator'
import UpdateValidator from 'App/Validators/User/UpdateValidator'

export default class AuthController {
  public async register({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(RegisterValidator)

    const user = await User.firstOrCreate(payload)

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

  public async update({ auth, request, response }: HttpContextContract) {
    const user = await auth.authenticate()

    try {
      const payload = await request.validate(UpdateValidator)

      try {
        if (payload.currentPassword) {
          await auth.attempt(user.email, payload.currentPassword)

          if (payload.newPassword) {
            user.password = payload.newPassword
            delete payload.newPassword
          }

          delete payload.currentPassword
        }
      } catch (error) {
        return response.badRequest({
          message: 'Current password is invalid.',
        })
      }

      user.merge(payload)
      await user.save()

      return response.ok({
        message: 'User updated successfully',
        user,
      })
    } catch (error) {
      if (error.messages.errors[0]) {
        const field = error.messages.errors[0].field

        switch (field) {
          case 'username':
            return response.badRequest({
              message: 'Username already taken!',
            })
          case 'email':
            return response.badRequest({
              message: 'Email already taken!',
            })
          default:
            break
        }
      }
      return response.badRequest({
        message: 'Invalid update request.',
      })
    }
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
