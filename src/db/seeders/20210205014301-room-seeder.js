'use strict';
const faker = require('faker');

const rooms = () => {
  const data = [];
  for (let index = 0; index < 5; index++) {
    data.push({
      room_name: faker.lorem.word(),
      room_capacity: 10 + (index * 5),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    });
  }
  return data;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rooms', rooms());
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
