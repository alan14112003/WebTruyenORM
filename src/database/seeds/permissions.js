/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('permissions').del()
  await knex('permissions').insert([
    // ----------roles--------------
    {
      name: 'roles all',
      code: 'roles.all',
      description: 'xem danh sách chức vụ',
    },
    {
      name: 'roles insert',
      code: 'roles.insert',
      description: 'thêm chức vụ',
    },
    {
      name: 'roles get',
      code: 'roles.get',
      description: 'xem chức vụ cụ thể',
    },
    {
      name: 'roles update',
      code: 'roles.update',
      description: 'sửa chức vụ cụ thể',
    },
    {
      name: 'roles delete',
      code: 'roles.delete',
      description: 'xóa chức vụ cụ thể',
    },
    // ----------permissions--------------
    {
      name: 'permissions all',
      code: 'permissions.all',
      description: 'xem danh sách quyền',
    },
    {
      name: 'permissions insert',
      code: 'permissions.insert',
      description: 'thêm quyền',
    },
    {
      name: 'permissions get',
      code: 'permissions.get',
      description: 'xem quyền cụ thể',
    },
    {
      name: 'permissions update',
      code: 'permissions.update',
      description: 'sửa quyền cụ thể',
    },
    {
      name: 'permissions delete',
      code: 'permissions.delete',
      description: 'xóa quyền cụ thể',
    },
    // -------categories-----------
    {
      name: 'categories all',
      code: 'categories.all',
      description: 'xem danh sách thể loại',
    },
    {
      name: 'categories insert',
      code: 'categories.insert',
      description: 'thêm thể loại',
    },
    {
      name: 'categories get',
      code: 'categories.get',
      description: 'xem thể loại cụ thể',
    },
    {
      name: 'categories update',
      code: 'categories.update',
      description: 'sửa thể loại cụ thể',
    },
    {
      name: 'categories delete',
      code: 'categories.delete',
      description: 'xóa thể loại cụ thể',
    },
  ])
}
