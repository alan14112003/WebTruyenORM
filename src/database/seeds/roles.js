/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    { name: 'user', description: 'người dùng cơ bản nhất', code: 'user.231' },
    {
      name: 'admin',
      description: 'người dùng cấp cao',
      code: 'admin.141',
      permissions: JSON.stringify([
        'roles.all',
        'roles.insert',
        'roles.get',
        'roles.update',
        'roles.delete',
        'permissions.all',
        'permissions.insert',
        'permissions.get',
        'permissions.update',
        'permissions.delete',
        'categories.all',
        'categories.insert',
        'categories.get',
        'categories.update',
        'categories.delete',
      ]),
    },
  ])
}
