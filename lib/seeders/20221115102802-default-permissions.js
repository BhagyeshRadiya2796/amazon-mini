'use strict';

/** @type {import('sequelize-cli').Migration} */
const permissions = [
  'view_users',
  'edit_users',
  'view_roles',
  'edit_roles',
  'view_products',
  'edit_products',
  'view_orders',
  'edit_orders'
]; 
module.exports = {
  async up (queryInterface, Sequelize) {
    const permissionsObjects = permissions.map(item => {
      return { name: item, created_at: new Date(), updated_at: new Date()}
    })
    return queryInterface.bulkInsert('permissions', permissionsObjects)
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
