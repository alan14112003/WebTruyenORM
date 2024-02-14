/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('follow_user', (table) => {
    table.bigInteger('user_from_id').unsigned()
    table.bigInteger('user_to_id').unsigned()
    table
      .foreign('user_from_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table
      .foreign('user_to_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.primary(['user_from_id', 'user_to_id'])
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
