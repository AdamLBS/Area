import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateEventValidator from 'App/Validators/CreateEventValidator'

export default class EventsController {
  public async createEvent({ request, response, auth }: HttpContextContract) {
    // example: const user = await User.query().where('email', email).first() -> trigger_api and response_api
  }
}
