import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'caches'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('spotify_listening').nullable
    })
  }

  public async down () {
  }
}
