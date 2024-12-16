'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Truyen', 'quoc_gia', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Truyen', 'isOver', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Truyen', 'quoc_gia');
    await queryInterface.removeColumn('Truyen', 'isOver');
  }
};