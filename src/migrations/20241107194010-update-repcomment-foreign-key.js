'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('RepComment', 'repcomment_ibfk_1');

    await queryInterface.addConstraint('RepComment', {
      fields: ['CommentId'],
      type: 'foreign key',
      name: 'repcomment_commentid_fk', // Tên của khóa ngoại mới
      references: {
        table: 'Comment', // Bảng mà CommentId tham chiếu tới
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeConstraint('RepComment', 'repcomment_commentid_fk');

    await queryInterface.addConstraint('RepComment', {
      fields: ['CommentId'],
      type: 'foreign key',
      name: 'repcomment_ibfk_1',
      references: {
        table: 'RepComment',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
};
