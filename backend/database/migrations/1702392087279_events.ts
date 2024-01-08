import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('uuid').primary()
      table.string('user_uuid').notNullable()
      table.string('name').notNullable()
      table.string('description').nullable()
      table
        .text('trigger_api')
        .notNullable()
        .references('uuid')
        .inTable('oauths')
        .onDelete('CASCADE')
      table
        .string('response_api')
        .notNullable()
        .references('uuid')
        .inTable('oauths')
        .onDelete('CASCADE')
      table.text('trigger_interaction').notNullable()
      table.text('response_interaction').notNullable()
      table.specificType('additional_actions', 'jsonb[]').nullable()
      table.string('timestamp').notNullable()
      table.boolean('active').notNullable().defaultTo(true)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
