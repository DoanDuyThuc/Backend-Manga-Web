'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Xóa cột truyen_loai
    await queryInterface.removeColumn('Truyen', 'truyen_loai');

    // Xóa cột truyen_theloai
    await queryInterface.removeColumn('Truyen', 'truyen_theloai');
  },
  async down(queryInterface, Sequelize) {
    // Thêm lại cột truyen_loai
    await queryInterface.addColumn('Truyen', 'truyen_loai', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    });

    // Thêm lại cột truyen_theloai
    await queryInterface.addColumn('Truyen', 'truyen_theloai', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};