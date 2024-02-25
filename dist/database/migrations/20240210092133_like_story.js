"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('like_story', function (table) {
    table.bigInteger('user_id').unsigned();
    table.bigInteger('story_id').unsigned();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('story_id').references('id').inTable('stories').onDelete('CASCADE');
    table.primary(['user_id', 'story_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};