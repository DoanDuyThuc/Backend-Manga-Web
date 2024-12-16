'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Truyen', 'truyen_duyet', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false // Default value for 'truyen_duyet'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Truyen', 'truyen_duyet');
  }
};