import Oauth from 'App/Models/Oauth'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import axios from 'axios'

export default class MySpotifyTask extends BaseTask {
  public static get schedule() {
    // Use CronTimeV2 generator:
    console.log('[MySpotifyTask] schedule')
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
    console.log('[MySpotifyTask] handle')
    const spotifyToken = (await Oauth.query().where('provider', 'spotify').firstOrFail()).token
    const result = await axios.get(`https://api.spotify.com/v1/me/player/currently-playing`, {
      headers: {
        Authorization: `Bearer  ${spotifyToken}`,
      },
    })
    console.log(result.data)
    // stock the result in a database
    // make an action if the song is different from the last one
  }
}
