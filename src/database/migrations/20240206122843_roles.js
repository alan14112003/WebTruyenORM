/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('roles', (table) => {
    table.increments('id')
    table.string('name')
    table.text('description')
    table.string('code').unique()
    table.text('permissions')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {}
