import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Log extends BaseModel {
  @column({ isPrimary: true })
  public uuid: string

  @column()
  public userUuid: string

  @column()
  public eventUuid: string

  @column()
  public date: string

  @column()
  public status: string

  @column()
  public logId: number

  @column()
  public errorMessage: string | null

  @column()
  public errorId: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUUID(log: Log) {
    log.uuid = uuidv4()
  }
}
