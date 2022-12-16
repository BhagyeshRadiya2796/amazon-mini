'use strict';

const { rolePermissions } = require('../seedData');

/** @type {import('sequelize-cli').Migration} */

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
