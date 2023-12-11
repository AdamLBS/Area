import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class ApiToken extends BaseModel {
  @column({ isPrimary: true })
  public uuid: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public token: string

  @column()
  public user_uuid: string

  @column()
  public name: string

  @column()
  public type: string

  @beforeCreate()
  public static async generateUUID(token: ApiToken) {
    token.uuid = uuidv4()
  }
}
