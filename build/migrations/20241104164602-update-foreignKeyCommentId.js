'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.renameColumn('RepComment', 'RepCommentId', 'CommentId');
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.renameColumn('RepComment', 'CommentId', 'RepCommentId');
  }
};