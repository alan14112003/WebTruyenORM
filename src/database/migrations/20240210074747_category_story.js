/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('category_story', (table) => {
    table.bigInteger('category_id').unsigned()
    table.bigInteger('story_id').unsigned()
    table
      .foreign('category_id')
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
    table
      .foreign('story_id')
      .references('id')
      .inTable('stories')
      .onDelete('CASCADE')
    table.primary(['category_id', 'story_id'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
