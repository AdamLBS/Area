import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'
import Event from 'App/Models/Event'
import CreateEventValidator from 'App/Validators/Event/CreateEventValidator'
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

    const triggerInteraction = {
      id: payload.triggerInteraction.id,
      name: TRIGGER_EVENTS.find((event) => event.id === payload.triggerInteraction.id)?.name,
      fields: payload.triggerInteraction.fields,
    }

    const responseInteraction = {
      id: payload.responseInteraction.id,
      name: RESPONSE_EVENTS.find((event) => event.id === payload.responseInteraction.id)?.name,
      fields: payload.responseInteraction.fields,
    }

    if (triggerApi && responseApi) {
      const eventPayload = {
        userUuid: user.uuid,
        triggerInteraction: triggerInteraction,
        responseInteraction: responseInteraction,
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
      message: 'Event could not be created error is : ' + triggerApi + ' ' + responseApi,
    })
  }

  public async getAvailableTriggerEvents({ response }: HttpContextContract) {
    console.log(TRIGGER_EVENTS)
    return response.ok(TRIGGER_EVENTS)
  }

  public async getAvailableResponseEvents({ response }: HttpContextContract) {
    return response.ok(RESPONSE_EVENTS)
  }

  public async getEvent({ response, params }: HttpContextContract) {
    const { uuid } = params
    if (!uuid) {
      return response.badRequest({
        message: 'Event uuid is required',
      })
    }
    const event = await Event.findBy('uuid', uuid)

    if (!event) {
      return response.notFound({
        message: 'Event not found',
      })
    }

    return response.ok({
      uuid: event.uuid,
      active: event.active,
      triggerInteraction: event.triggerInteraction,
      responseInteraction: event.responseInteraction,
      timestamp: event.timestamp,
      created_at: event.createdAt,
      updated_at: event.updatedAt,
    })
  }

  public async getMyEvents({ response, auth }: HttpContextContract) {
    const user = await auth.authenticate()
    const events = await Event.query().where('user_uuid', user.uuid)
    return response.ok(
      events.map((event) => {
        return {
          uuid: event.uuid,
          active: event.active,
          // name: event.name,
          // description: event.description,
        }
      })
    )
  }
}
