import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Oauth from 'App/Models/Oauth'
import Event from 'App/Models/Event'
import CreateEventValidator from 'App/Validators/Event/CreateEventValidator'
import { TRIGGER_EVENTS } from 'App/params/triggerEvents'
import { RESPONSE_EVENTS } from 'App/params/responseEvents'
import { AdditionalInteraction } from 'types/events'
import UpdateEventSettingValidator from 'App/Validators/Event/UpdateEventSettingValidator'
import AddActionValidator from 'App/Validators/Event/AddActionValidator'
import DeleteActionValidator from 'App/Validators/Event/DeleteActionValidator'
import UpdateActionValidator from 'App/Validators/Event/UpdateActionValidator'

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

    if (!triggerApi || !responseApi) {
      return response.badRequest({
        message: 'Trigger or response api not found',
        triggerApi,
        responseApi,
      })
    }

    const triggerInteraction = {
      provider: payload.trigger_provider,
      id: payload.triggerInteraction.id,
      name: TRIGGER_EVENTS.find((event) => event.id === payload.triggerInteraction.id)?.name || '',
      fields: payload.triggerInteraction.fields,
    }

    const responseInteraction = {
      provider: payload.response_provider,
      id: payload.responseInteraction.id,
      name:
        RESPONSE_EVENTS.find((event) => event.id === payload.responseInteraction.id)?.name || '',
      fields: payload.responseInteraction.fields,
    }

    let additionalActions: AdditionalInteraction[] = []

    if (payload.additionalActions && payload.additionalActions.length > 0) {
      await Promise.all(
        payload.additionalActions.map(async (action) => {
          const actionApi = await Oauth.query()
            .where('user_uuid', user.uuid)
            .where('provider', action.action_provider)
            .first()

          if (!actionApi) {
            throw new Error('Action api not found')
          }

          const newAction = {
            action_provider: action.action_provider,
            id: action.id,
            name: RESPONSE_EVENTS.find((event) => event.id === action.id)?.name,
            fields: action.fields,
          }
          additionalActions.push(newAction)
        })
      )
    }

    if (triggerApi && responseApi) {
      const eventPayload = {
        userUuid: user.uuid,
        name: payload.name,
        description: payload.description ? payload.description : null,
        triggerInteraction: triggerInteraction,
        responseInteraction: responseInteraction,
        triggerApi: triggerApi.uuid,
        responseApi: responseApi.uuid,
        additionalActions,
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

  public async updateEventSettings({ request, response, auth, params }: HttpContextContract) {
    const payload = await request.validate(UpdateEventSettingValidator)
    const user = await auth.authenticate()

    const { uuid } = params
    const event = await Event.query().where('user_uuid', user.uuid).where('uuid', uuid).first()
    if (!event) {
      return response.notFound({
        message: 'Event not found',
      })
    }
    event.merge(payload)
    await event.save()
    return response.ok({
      message: 'Event updated successfully',
      event,
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
      name: event.name,
      description: event.description,
      active: event.active,
      triggerInteraction: event.triggerInteraction,
      responseInteraction: event.responseInteraction,
      additionalActions: event.additionalActions,
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
          name: event.name,
        }
      })
    )
  }

  public async deleteEvent({ response, auth, params }: HttpContextContract) {
    const user = await auth.authenticate()
    const { uuid } = params
    if (!uuid) {
      return response.badRequest({
        message: 'Event uuid is required',
      })
    }
    const event = await Event.query().where('user_uuid', user.uuid).where('uuid', uuid).delete()
    if (event[0] > 0) {
      return response.ok({
        message: 'Event deleted',
      })
    }
    return response.notFound({
      message: 'Event not found',
    })
  }

  public async activateEvent({ response, auth, request, params }: HttpContextContract) {
    const user = await auth.authenticate()
    const { uuid } = params
    if (!uuid) {
      return response.badRequest({
        message: 'Event uuid is required',
      })
    }
    const event = await Event.query().where('user_uuid', user.uuid).where('uuid', uuid).first()
    if (!event) {
      return response.notFound({
        message: 'Event not found',
      })
    }

    const { activated } = request.only(['activated'])
    event.active = activated
    await event.save()
    return response.ok({
      message: 'Event updated',
    })
  }

  public async addAction({ response, auth, request, params }: HttpContextContract) {
    const payload = await request.validate(AddActionValidator)
    const user = await auth.authenticate()
    const { uuid } = params

    if (!uuid) {
      return response.badRequest({
        message: 'Event uuid is required',
      })
    }

    const event = await Event.query().where('user_uuid', user.uuid).where('uuid', uuid).first()

    if (!event) {
      return response.notFound({
        message: 'Event not found',
      })
    }

    const actionApi = await Oauth.query()
      .where('user_uuid', user.uuid)
      .where('provider', payload.action_provider)
      .first()

    if (!actionApi) {
      return response.badRequest({
        message: 'Action api not found',
      })
    }

    const newAction = {
      id: payload.id,
      name: RESPONSE_EVENTS.find((event) => event.id === payload.id)?.name,
      fields: payload.fields,
      action_provider: payload.action_provider,
    }

    if (event.additionalActions?.map((action) => action.id).includes(newAction.id)) {
      return response.badRequest({
        message: 'Action already exists',
      })
    }

    event.additionalActions?.push(newAction)
    await event.save()

    return response.ok({
      message: 'Action added',
    })
  }

  public async deleteAction({ response, auth, request, params }: HttpContextContract) {
    const payload = await request.validate(DeleteActionValidator)
    const user = await auth.authenticate()
    const { uuid } = params

    if (!uuid) {
      return response.badRequest({
        message: 'Event uuid is required',
      })
    }

    const event = await Event.query().where('user_uuid', user.uuid).where('uuid', uuid).first()

    if (!event) {
      return response.notFound({
        message: 'Event not found',
      })
    }

    if (event.additionalActions && event.additionalActions?.length <= payload.id) {
      return response.badRequest({
        message: 'Action not found',
      })
    }

    event.additionalActions?.splice(payload.id, 1)
    await event.save()

    return response.ok({
      message: 'Action deleted',
    })
  }

  public async updateAction({ response, auth, request, params }: HttpContextContract) {
    const payload = await request.validate(UpdateActionValidator)
    const user = await auth.authenticate()
    const { uuid } = params

    if (!uuid) {
      return response.badRequest({
        message: 'Event uuid is required',
      })
    }

    const event = await Event.query().where('user_uuid', user.uuid).where('uuid', uuid).first()

    if (!event) {
      return response.notFound({
        message: 'Event not found',
      })
    }

    const actionApi = await Oauth.query()
      .where('user_uuid', user.uuid)
      .where('provider', payload.response_provider)
      .first()

    if (!actionApi) {
      return response.badRequest({
        message: 'Action api not found',
      })
    }

    const newResponse = {
      provider: payload.response_provider,
      id: payload.responseInteraction.id,
      name:
        RESPONSE_EVENTS.find((event) => event.id === payload.responseInteraction.id)?.name || '',
      fields: payload.responseInteraction.fields,
    }

    event.responseInteraction = newResponse
    await event.save()

    return response.ok({
      message: 'Action updated',
    })
  }
}
