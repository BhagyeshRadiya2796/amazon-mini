'use strict';

const { permissions } = require('../seedData');

/** @type {import('sequelize-cli').Migration} */

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
