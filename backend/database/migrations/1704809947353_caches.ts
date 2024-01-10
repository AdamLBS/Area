import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'caches'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('uuid').primary()
      table.string('last_commit').nullable()
      table.text('twitch_in_live').nullable()
      table.text('spotify_liked_songs').nullable()
      table.boolean('spotify_listening').nullable()
      table.text('spotify_song_uri').nullable()
      table.string('github_latest_action_id').nullable()

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
