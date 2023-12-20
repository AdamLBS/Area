import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateEventValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    trigger_provider: schema.string(),
    response_provider: schema.string(),
    triggerInteraction: schema.object().members({
      id: schema.string(),
      fields: schema.object().anyMembers(),
    }),
    responseInteraction: schema.object().members({
      id: schema.string(),
      fields: schema.object().anyMembers(),
    }),
  })
  public messages: CustomMessages = {
    'trigger_provider.required': 'Trigger provider is required',
    'response_provider.required': 'Response provider is required',
    'triggerInteraction.required': 'Trigger interaction is required',
    'triggerInteraction.name.required': 'Trigger interaction name is required',
    'responseInteraction.required': 'Response interaction is required',
    'responseInteraction.name.required': 'Response interaction name is required',
    'responseInteraction.fields.email.required': 'Email is required',
    'responseInteraction.fields.email.email': 'Email is not valid',
  }

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
}
