import Database from '@ioc:Adonis/Lucid/Database'
import Cache from 'App/Models/Cache'
import {
  ResponseInteraction,
  eventHandler,
  handleAdditionalActions,
} from 'App/functions/EventHandler'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { APIEventField } from 'types/events'
export default class Timer extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everyFiveSeconds()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmp/adonis5-scheduler/locks/your-class-name`
   */
  public static get useLock() {
    return false
  }

  private async updateLastTimerActive(uuid: string, active: boolean) {
    await Cache.updateOrCreate(
      {
        uuid: uuid,
      },
      {
        timerActive: active,
      }
    )
  }

  public async handle() {
    this.logger.info('Timer Handled')
    const events = await Database.query()
      .from('events')
      .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'everyDayTimer'`)
      .where('active', true)
    for (const event of events) {
      const jsonValsAction = JSON.parse(event.trigger_interaction)
      const fields = jsonValsAction.fields as APIEventField<any>[]
      const time = fields[0].value
      const now = new Date()
      const [hours, minutes] = time.split(':').map(Number)
      const userCache = await Cache.query().from('caches').where('uuid', event.uuid).first()
      if (!userCache || userCache.timerActive === null) {
        await this.updateLastTimerActive(event.uuid, false)
      }
      if (now.getHours() === hours && now.getMinutes() === minutes) {
        if (userCache && !userCache.timerActive) {
          const jsonVals = JSON.parse(event.response_interaction)
          const responseInteraction = jsonVals.id.toString() as ResponseInteraction
          const fields = jsonVals.fields as APIEventField<any>[]
          await eventHandler(responseInteraction, fields, event.response_api)
          await handleAdditionalActions(event)
          await this.updateLastTimerActive(event.uuid, true)
        }
      } else if (userCache && userCache.timerActive) {
        await this.updateLastTimerActive(event.uuid, false)
      }
    }
  }
}
