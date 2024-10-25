'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('User', 'role', {
      type: Sequelize.ENUM('user', 'admin', 'author'),
      allowNull: false,
      defaultValue: 'user'
    });
    await queryInterface.addColumn('User', 'avatar', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('User', 'point', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('User', 'role');
    await queryInterface.removeColumn('User', 'avatar');
    await queryInterface.removeColumn('User', 'point');
  }
};
