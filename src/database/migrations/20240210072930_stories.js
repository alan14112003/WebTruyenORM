/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('stories', (table) => {
    table.bigIncrements('id')
    table.string('name')
    table.tinyint('status')
    table.tinyint('access')
    table.bigInteger('author_id').unsigned()
    table.bigInteger('user_id').unsigned()
    table.text('descriptions')
    table.text('avatar')
    table.string('slug')
    table.tinyint('type')
    table.timestamps(true, true)
    table.timestamp('deleted_at')
    table.foreign('author_id').references('id').inTable('authors')
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
