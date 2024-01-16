import Database from '@ioc:Adonis/Lucid/Database'
import Cache from 'App/Models/Cache'
import {
  ResponseInteraction,
  eventHandler,
  handleAdditionalActions,
} from 'App/functions/EventHandler'
import { BaseTask, CronTimeV2 } from 'adonis5-scheduler/build/src/Scheduler/Task'
import axios from 'axios'
import { APIEventField } from 'types/events'

export interface Crypto {
  data: Data
}

export interface Data {
  amount: string
  currency: string
}

export default class CoinbaseCryptoListener extends BaseTask {
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

  private async fetchCryptoPrice(crypto: string) {
    try {
      return (await axios.get<Crypto>(`https://api.coinbase.com/v2/prices/${crypto}/spot`)).data
    } catch (error) {
      throw new Error('Coinbase API Error')
    }
  }

  private async updateCryptoPrice(uuid: any, cryptoReachValue: boolean) {
    await Cache.updateOrCreate(
      {
        uuid: uuid,
      },
      {
        cryptoReachValue: cryptoReachValue,
      }
    )
  }

  private useVariablesInFields = (
    fields: APIEventField<any>[],
    amount: string,
    currency: string,
    crypto: string
  ) => {
    for (const field of fields) {
      if ((field.value as string).includes('$amount'))
        field.value = field.value.replace('$amount', amount)
      if ((field.value as string).includes('$currency'))
        field.value = field.value.replace('$currency', currency)
      if ((field.value as string).includes('$crypto'))
        field.value = field.value.replace('$crypto', crypto)
    }
  }

  public async handle() {
    const events = await Database.query()
      .from('events')
      .whereRaw(`CAST(trigger_interaction AS JSONB) #>> '{id}' = 'cryptoPrice'`)
      .where('active', true)
    for (const event of events) {
      const triggerApi = await Database.query()
        .from('oauths')
        .where('uuid', event.trigger_api)
        .first()
      if (triggerApi && triggerApi.token) {
        const jsonVals = JSON.parse(event.trigger_interaction)
        const jsonValsResponse = JSON.parse(event.response_interaction)
        const responseInteraction = jsonValsResponse.id.toString() as ResponseInteraction
        const reponseFields = jsonValsResponse.fields as APIEventField<any>[]
        const fields = jsonVals.fields as APIEventField<any>[]
        const crypto = fields[0].value + '-' + fields[1].value
        const cryptoPrice = await this.fetchCryptoPrice(crypto)
        const cryptoPriceNumber = Number(cryptoPrice.data.amount)
        const minimumPrice = Number(fields[2].value)
        const maximumPrice = Number(fields[3].value)
        const userCache = await Cache.query().from('caches').where('uuid', event.uuid).first()
        if (!userCache || userCache.cryptoReachValue === null) {
          await this.updateCryptoPrice(event.uuid, false)
          return
        }
        if (cryptoPriceNumber < minimumPrice || cryptoPriceNumber > maximumPrice) {
          if (!userCache.cryptoReachValue) {
            this.useVariablesInFields(
              reponseFields,
              cryptoPrice.data.amount,
              cryptoPrice.data.currency,
              fields[0].value
            )
            for (const additionalAction of event.additional_actions) {
              this.useVariablesInFields(
                additionalAction.fields,
                cryptoPrice.data.amount,
                cryptoPrice.data.currency,
                fields[0].value
              )
            }
            await handleAdditionalActions(event)
            await eventHandler(responseInteraction, reponseFields, event.response_api)
            await this.updateCryptoPrice(event.uuid, true)
          }
        } else if (userCache.cryptoReachValue) {
          await this.updateCryptoPrice(event.uuid, false)
        }
      }
    }
  }
}
