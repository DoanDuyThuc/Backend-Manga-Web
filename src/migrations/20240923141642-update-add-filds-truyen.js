'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Truyen', 'truyen_luotthich');
    await queryInterface.removeColumn('Truyen', 'truyen_luottheodoi');
    await queryInterface.removeColumn('Truyen', 'truyen_luotxem');
  }
};
