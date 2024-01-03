import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

type Interaction = {
  id: string
  fields: any[]
}

type AdditionalInteraction = {
  action_provider: string
  id: string
  fields: any[]
}
export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public uuid: string

  @column()
  public userUuid: string

  @column()
  public name: string

  @column()
  public description: string | null

  @column()
  public triggerApi: string

  @column()
  public responseApi: string

  @column()
  public triggerInteraction: Interaction

  @column()
  public responseInteraction: Interaction

  @column()
  public additionalActions: AdditionalInteraction[] | null

  @column()
  public timestamp: string

  @column()
  public active: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(event: Event) {
    event.uuid = uuidv4()
  }

  @beforeCreate()
  public static async generateTimestamp(event: Event) {
    event.timestamp = new Date().toISOString()
  }
}
