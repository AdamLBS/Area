import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Oauth extends BaseModel {
  @column({ isPrimary: true })
  public uuid: string

  @column()
  public userUuid: string

  @column()
  public provider: string

  @column()
  public token: string

  @column()
  public refreshToken: string

  @column()
  public webhook: string

  @column()
  public userId: string | null

  @column()
  public twitchInLive: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(oauth: Oauth) {
    oauth.uuid = uuidv4()
  }
}
