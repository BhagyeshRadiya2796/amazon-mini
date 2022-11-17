'use strict';

/** @type {import('sequelize-cli').Migration} */
const rolePermissions = [
  {
    role_id: 1,
    permission_id: 1
  },
  {
    role_id: 1,
    permission_id: 2
  },
  {
    role_id: 1,
    permission_id: 3
  },
  {
    role_id: 1,
    permission_id: 4
  },
  {
    role_id: 1,
    permission_id: 5
  },
  {
    role_id: 1,
    permission_id: 6
  },
  {
    role_id: 1,
    permission_id: 7
  },
  {
    role_id: 1,
    permission_id: 8
  },
  {
    role_id: 2,
    permission_id: 5
  },
  {
    role_id: 2,
    permission_id: 7
  },
  {
    role_id: 2,
    permission_id: 8
  },
  {
    role_id: 3,
    permission_id: 5
  },
  {
    role_id: 3,
    permission_id: 6
  },
  {
    role_id: 3,
    permission_id: 7
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
   const rolePermisionObjects = rolePermissions.map(item => {
    return {...item, created_at: new Date(), updated_at: new Date()}
   })
   return queryInterface.bulkInsert('role_permissions', rolePermisionObjects)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
