import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
@
export default class LogsController {
  public async getLogs({ response, params }: HttpContextContract) {
    const { uuid } = params
    if (!uuid) {
      return response.badRequest({
        message: 'Event uuid is required',
      })
    }
    const logs = await Log.query().where('event_uuid', uuid).orderBy('created_at', 'desc')
    return response.ok({
      message: 'Logs retrieved successfully',
      logs,
    })
  }
}
