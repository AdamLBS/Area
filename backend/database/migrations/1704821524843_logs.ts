import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'logs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.uuid('user_uuid').notNullable()
      table
        .uuid('event_uuid')
        .notNullable()
        .references('uuid')
        .inTable('events')
        .onDelete('CASCADE')
      table.string('status').notNullable()
      table.integer('log_id').notNullable()
      table.string('error_message').nullable()
      table.string('error_id').nullable()

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
