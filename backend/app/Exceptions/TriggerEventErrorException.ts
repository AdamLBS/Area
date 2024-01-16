import { Exception } from '@adonisjs/core/build/standalone'
import Sentry from '@ioc:Adonis/Addons/Sentry'
import Log from 'App/Models/Log'

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
export default class TriggerEventErrorException extends Exception {
  constructor(message: string, eventUuid: string) {
    super(message, 400, 'E_EXPECTED_EXCEPTION')
    Sentry.captureException(this)
    this.createLog(message, eventUuid)
  }

  public async createLog(message: string, eventUuid: string) {
    await Log.create({
      errorId: '400',
      errorMessage: 'E_EXPECTED_EXCEPTION',
      message,
      status: 'error',
      eventUuid,
    })
  }
}
