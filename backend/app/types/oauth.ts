import { DateTime } from 'luxon'

export type OauthType = {
  uuid: string
  userUuid: string
  provider: string
  token: string | null
  refreshToken: string | null
  webhook: string | null
  twitchInLive: string | null
  createdAt: DateTime
  updatedAt: DateTime
}
