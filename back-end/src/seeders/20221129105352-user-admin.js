const bcrypt = require("bcryptjs");

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('users', [{
      name: 'Tiago Silva',
      email: 'tiagoluizrs@gmail.com',
      username: 'tiagoluizrs',
      password: bcrypt.hashSync("123456", 10),
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
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
