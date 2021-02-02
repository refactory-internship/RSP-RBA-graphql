'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = 'password';

    return queryInterface.bulkInsert('Users', [
      {
        RoleId: 1,
        email: 'admin@mail.com',
        password: bcrypt.hashSync(password, 10),
        photo: null,
        cloudinary_id: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
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

