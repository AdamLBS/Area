import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'caches'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('spotify_song_uri').nullable()
    })
  }

  public async down () {
  }
}
