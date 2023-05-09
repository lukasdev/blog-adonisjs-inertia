import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('cover').nullable();
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('cover');
    })
  }
}
