'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RepComment extends Model {
    static associate(models) {

      RepComment.belongsTo(models.Comment, {
        foreignKey: 'CommentId',
      });

      RepComment.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }

  }
  RepComment.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CommentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Comment',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'RepComment',
    tableName: 'RepComment',

  });
  return RepComment;
};