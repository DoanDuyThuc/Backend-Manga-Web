'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('TruyenYeuThich', 'truyen_ma');
    await queryInterface.removeColumn('TruyenYeuThich', 'truyen_ten');
    await queryInterface.removeColumn('TruyenYeuThich', 'truyen_hinhanhdaidien');
    await queryInterface.addColumn('TruyenYeuThich', 'TruyenId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Truyen', // Tên bảng của model Truyen
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
