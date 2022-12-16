'use strict';

const { defaultUsersRoles } = require("../seedData");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('user_roles', defaultUsersRoles)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
