'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Truyen', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      truyen_ma: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      truyen_ten: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      truyen_hinhanhdaidien: {
        type: Sequelize.STRING,
        allowNull: false
      },
      truyen_loai: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      truyen_theloai: {
        type: Sequelize.STRING,
        allowNull: false
      },
      truyen_tacgia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      truyen_motangan: {
        type: Sequelize.TEXT,
        allowNull: false
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
    await queryInterface.dropTable('Truyen');
  }
};