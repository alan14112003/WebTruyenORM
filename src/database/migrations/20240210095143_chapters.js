/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('chapters', (table) => {
    table.bigIncrements('id')
    table.bigInteger('story_id').unsigned()
    table.integer('number')
    table.string('name')
    table.text('content', 'longtext')
    table.boolean('is_free')
    table.date('private_end')
    table.integer('price')
    table.timestamps(true, true)
    table.timestamp('deleted_at')
    table.tinyint('type')
    table
      .foreign('story_id')
      .references('id')
      .inTable('stories')
      .onDelete('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
