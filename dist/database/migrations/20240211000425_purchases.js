"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('purchases', function (table) {
    table.bigInteger('user_id').unsigned();
    table.bigInteger('chapter_id').unsigned();
    table.integer('price');
    table.timestamps(true, true);
    table.foreign('chapter_id').references('id').inTable('chapters');
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.primary(['user_id', 'chapter_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};