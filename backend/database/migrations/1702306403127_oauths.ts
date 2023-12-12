import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'oauths'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('uuid').primary()
      // table.string('user_uuid').unsigned().references('uuid').inTable('users').onDelete('CASCADE')
      table.string('user_uuid').notNullable()
      table.string('provider').notNullable()
      table.string('token')
      table.string('refresh_token')
      table.string('webhook')
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
