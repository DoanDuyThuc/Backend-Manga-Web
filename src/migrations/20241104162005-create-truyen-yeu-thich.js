'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TruyenYeuThich', {
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
        allowNull: false
      },
      truyen_hinhanhdaidien: {
        type: Sequelize.STRING,
        allowNull: false
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User', // Tên bảng của model User
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('TruyenYeuThich');
  }
};
