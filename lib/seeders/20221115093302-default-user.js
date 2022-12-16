'use strict';

const { defaultUser } = require('../seedData');
const bcrypt = require('bcrypt')
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    const defaultHashPasswordUser = defaultUser.map(async (user) => {
      user.password = await bcrypt.hash(user.password, 10);
      return user
    })

    const users = await Promise.all(defaultHashPasswordUser)
    console.log('users', users)
    return queryInterface.bulkInsert('users', users)
  },

  async down (queryInterface, Sequelize) {
    // return queryInterface.bulkInsert('users', defaultUser)
  }
};

