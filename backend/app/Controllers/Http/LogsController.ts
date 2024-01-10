import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'
import { DateTime } from 'luxon'

type UsesTimestamps = {
  ['january']: number
  ['february']: number
  ['march']: number
  ['april']: number
  ['may']: number
  ['june']: number
  ['july']: number
  ['august']: number
  ['september']: number
  ['october']: number
  ['november']: number
  ['december']: number
}

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
  public async getStats({ response, params }: HttpContextContract) {
    const { uuid } = params
    if (!uuid) {
      return response.badRequest({
        message: 'Event uuid is required',
      })
    }
    const logs = await Log.query().where('event_uuid', uuid).orderBy('created_at', 'desc')
    const total = logs.length
    const success = logs.filter((log) => log.status === 'success').length
    const errors = logs.filter((log) => log.status === 'error').length
    const today = logs.filter((log) => {
      const today = DateTime.now()
      const logDate = log.createdAt.equals(today)
      return logDate
    }).length
    const lastLogs = logs.slice(0, 5)
    const todayDate = DateTime.now()
    const logsByMonth: UsesTimestamps = {
      january: logs.filter(
        (log) => log.createdAt.month === 1 && log.createdAt.year === todayDate.year
      ).length,
      february: logs.filter(
        (log) => log.createdAt.month === 2 && log.createdAt.year === todayDate.year
      ).length,
      march: logs.filter(
        (log) => log.createdAt.month === 3 && log.createdAt.year === todayDate.year
      ).length,
      april: logs.filter(
        (log) => log.createdAt.month === 4 && log.createdAt.year === todayDate.year
      ).length,
      may: logs.filter((log) => log.createdAt.month === 5 && log.createdAt.year === todayDate.year)
        .length,
      june: logs.filter((log) => log.createdAt.month === 6 && log.createdAt.year === todayDate.year)
        .length,
      july: logs.filter((log) => log.createdAt.month === 7 && log.createdAt.year === todayDate.year)
        .length,
      august: logs.filter(
        (log) => log.createdAt.month === 8 && log.createdAt.year === todayDate.year
      ).length,
      september: logs.filter(
        (log) => log.createdAt.month === 9 && log.createdAt.year === todayDate.year
      ).length,
      october: logs.filter(
        (log) => log.createdAt.month === 10 && log.createdAt.year === todayDate.year
      ).length,
      november: logs.filter(
        (log) => log.createdAt.month === 11 && log.createdAt.year === todayDate.year
      ).length,
      december: logs.filter(
        (log) => log.createdAt.month === 12 && log.createdAt.year === todayDate.year
      ).length,
    }
    response.ok({
      message: 'Stats retrieved successfully',
      stats: {
        total,
        success,
        errors,
        today,
        lastLogs,
        logsByMonth,
      },
    })
  }
}
