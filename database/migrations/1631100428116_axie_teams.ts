import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AxieTeams extends BaseSchema {
  protected tableName = 'axie_teams'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.json('axie_ids').notNullable()
      table.integer('created_by').unsigned().references('users.id')

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
