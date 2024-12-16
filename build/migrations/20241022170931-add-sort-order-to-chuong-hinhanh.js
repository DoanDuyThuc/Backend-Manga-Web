'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('chuong_hinhanh', 'sort_order', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0 // Giá trị mặc định nếu không có thứ tự
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('chuong_hinhanh', 'sort_order');
  }
};