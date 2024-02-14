/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('story_histories', (table) => {
    table.bigInteger('user_id').unsigned()
    table.bigInteger('chapter_id').unsigned()
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .foreign('chapter_id')
      .references('id')
      .inTable('chapters')
      .onDelete('CASCADE')
    table.primary(['user_id', 'chapter_id'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
