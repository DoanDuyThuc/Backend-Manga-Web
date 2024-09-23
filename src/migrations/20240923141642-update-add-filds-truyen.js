'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Truyen', 'truyen_luotthich', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.addColumn('Truyen', 'truyen_luottheodoi', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.addColumn('Truyen', 'truyen_luotxem', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Truyen', 'truyen_luotthich');
    await queryInterface.removeColumn('Truyen', 'truyen_luottheodoi');
    await queryInterface.removeColumn('Truyen', 'truyen_luotxem');
  }
};
