"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('comments', function (table) {
    table.bigIncrements('id');
    table.bigInteger('user_id').unsigned();
    table.bigInteger('story_id').unsigned();
    table.bigInteger('parent_id').unsigned();
    table.text('content');
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('story_id').references('id').inTable('stories').onDelete('CASCADE');
    table.foreign('parent_id').references('id').inTable('comments').onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};