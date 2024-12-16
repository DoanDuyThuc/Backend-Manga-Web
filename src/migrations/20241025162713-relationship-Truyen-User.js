'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Truyen', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Cho phép null để tránh lỗi khóa ngoại
      references: {
        model: 'User', // Tên bảng chính xác trong cơ sở dữ liệu
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Truyen', 'UserId');
  }
};
