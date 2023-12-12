import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import axios from 'axios'
export default class MyTaskName extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    console.log('[MyTaskName] schedule')
    return CronTimeV2.everyThreeMinutes()
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
    console.log('[MyTaskName] handle')
    const twitchToken = 'cq8g9cwtqbavua4x445ejnemydt73h'
    const twitchId = 'so4ebfhr3b4pjsgbl4py6hleemugbu'

    const result = await axios.get(
      `https://api.twitch.tv/helix/streams/followed?user_id=261629232`,
      {
        headers: {
          'Client-ID': twitchId,
          'Authorization': `Bearer ${twitchToken}`,
        },
      }
    )

    for (const data of result.data.data) {
      await axios.post(
        `https://discord.com/api/webhooks/1184108920436953098/HpXo-M737CvNJxvY3Y-pqnxddgXnw1JhiIQS1YHYURXPiDgB7SddR9qTkMj6aCD290Xm?wait=true`,
        {
          content: `@everyone ${data.user_name} is live on Twitch!
        https://www.twitch.tv/${data.user_name}`,
        }
      )
    }
  }
}
