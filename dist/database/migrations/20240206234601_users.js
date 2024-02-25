"use strict";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.bigIncrements('id');
    table.string('name');
    table.string('email').unique();
    table.string('password');
    table.string('avatar');
    table.tinyint('gender');
    table["boolean"]('status').defaultTo(false);
    table.timestamp('deleted_at');
    table.timestamps(true, true);
    table.string('role_code');
    table.foreign('role_code').references('code').inTable('roles').onDelete('CASCADE');
    table.string('reset_password', 6);
    table.integer('account_balance');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};