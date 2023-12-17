import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'
import Event from 'App/Models/Event'
import CreateEventValidator from 'App/Validators/CreateEventValidator'
import { TRIGGER_EVENTS } from 'App/params/triggerEvents'
import { RESPONSE_EVENTS } from 'App/params/responseEvents'

export default class EventsController {
  public async createEvent({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(CreateEventValidator)

    const user = await auth.authenticate()

    const triggerApi = await Oauth.query()
      .where('user_uuid', user.uuid)
      .where('provider', payload.trigger_provider)
      .first()

    const responseApi = await Oauth.query()
      .where('user_uuid', user.uuid)
      .where('provider', payload.response_provider)
      .first()

    if (triggerApi && responseApi) {
      const eventPayload = {
        userUuid: user.uuid,
        triggerInteraction: payload.trigger_interaction,
        responseInteraction: payload.response_interaction,
        triggerApi: triggerApi.uuid,
        responseApi: responseApi.uuid,
        active: true,
      }
      const event = await Event.firstOrCreate(eventPayload)
      return response.ok({
        message: 'Event created successfully',
        event,
      })
    }

    return response.internalServerError({
      message: 'Event could not be created',
    })
  }

  public async getAvailableTriggerEvents({ response }: HttpContextContract) {
    console.log(TRIGGER_EVENTS)
    return response.ok(TRIGGER_EVENTS)
  }

  public async getAvailableResponseEvents({ response }: HttpContextContract) {
    return response.ok(RESPONSE_EVENTS)
  }
}
