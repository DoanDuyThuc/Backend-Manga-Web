'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Chuong', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Chuong_so: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      Chuong_ten: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Chuong_noidung: {
        type: Sequelize.STRING,
        allowNull: false
      },
      TruyenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Chuong');
  }
};