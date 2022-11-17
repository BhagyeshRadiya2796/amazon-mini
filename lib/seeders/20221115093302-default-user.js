'use strict';

/** @type {import('sequelize-cli').Migration} */

const defaultUser = [{
  "id": "asdasdas",
  "first_name": 'admin',
  "last_name": 'user',
  "password": 'admin',
  "email": 'admin@admin.com',
  "created_at": new Date(),
  "updated_at": new Date()
}]

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', defaultUser)
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.bulkInsert('users', defaultUser)
  }
};
