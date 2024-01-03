export type APIEventField<T> = {
  value: T
  name: string
  required: boolean
}

export type APIEvent = {
  provider: string
  id: string
  name: string
  fields: APIEventField<any>[]
}

export type AdditionalInteraction = {
  action_provider: string
  id: string
  name?: string
  fields: any[]
}
