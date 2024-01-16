import { Exception } from '@adonisjs/core/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Sentry from '@ioc:Adonis/Addons/Sentry'
import Log from 'App/Models/Log'
import { v4 as uuidv4 } from 'uuid'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new TriggerEventErrorException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class ResponseEventFailedException extends Exception {
  constructor(message: string, eventUuid: string) {
    super(message, 701, 'E_RESPONSE_EVENT_FAILED_EXCEPTION')
    Sentry.captureException(this)
    this.createLog(message, eventUuid)
  }

  public async createLog(message: string, eventUuid: string) {
    await Log.create({
      errorId: '701',
      errorMessage: 'E_RESPONSE_EVENT_FAILED_EXCEPTION',
      message,
      status: 'failed',
      eventUuid,
    })
  }
}
