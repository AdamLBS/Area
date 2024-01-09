export type APIEventField<T> = {
  value: T
  name: string
  required: boolean
}

export type APIEventInteraction = {
  id: string
  name: string
  fields: APIEventField<any>[]
  variables: {}
}

export type APIEvent = {
  provider: string
  interactions: APIEventInteraction[]
}

export type AdditionalInteraction = {
  action_provider: string
  id: string
  name?: string
  fields: any[]
}
