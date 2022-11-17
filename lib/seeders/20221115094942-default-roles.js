'use strict';

/** @type {import('sequelize-cli').Migration} */
const defaultRoles = [
  {
    "name": 'admin',
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "name": 'buyer',
    "created_at": new Date(),
    "updated_at": new Date()
  },
  {
    "name": 'seller',
    "created_at": new Date(),
    "updated_at": new Date()
  }
]
module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('roles', defaultRoles)
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
