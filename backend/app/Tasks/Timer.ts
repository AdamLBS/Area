import Database from '@ioc:Adonis/Lucid/Database'
import { ResponseInteraction, eventHandler } from 'App/functions/EventHandler'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import { APIEventField } from 'types/events'

export default class Timer extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    return CronTimeV2.everySecond()
    // or just use return cron-style string (simple cron editor: crontab.guru)
  }
  /**
   * Set enable use .lock file for block run retry task
   * Lock file save to `build/tmp/adonis5-scheduler/locks/your-class-name`
   */
  public static get useLock() {
    return false
  }

  public async handle() {
    this.logger.info('Timer Handled')
    const events = await Database.query()
      .from('events')
      .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'everyDayTimer'`)
    for (const event of events) {
      const jsonValsResponse = JSON.parse(event.response_interaction)
      const jsonValsAction = JSON.parse(event.trigger_interaction)
      const responseInteraction = jsonValsResponse.id.toString() as ResponseInteraction
      const fields = jsonValsAction.fields as APIEventField<any>[]
      const time = fields[0].value
      const now = new Date()
      const [hours, minutes] = time.split(':').map(Number)
      if (now.getHours() === hours && now.getMinutes() === minutes) {
        console.log('Timer triggered')
        await eventHandler(responseInteraction, [], event.response_api)
      }
    }
  }
}
