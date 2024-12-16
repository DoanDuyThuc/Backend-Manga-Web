'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {

      Comment.belongsTo(models.Truyen, {
        foreignKey: 'TruyenId',
      });

      Comment.hasMany(models.RepComment, {
        foreignKey: 'CommentId',
      });

      Comment.belongsTo(models.User, {
        foreignKey: 'UserId',
      });

    }

  }
  Comment.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    IsShow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    TruyenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Truyen',
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
    modelName: 'Comment',
    tableName: 'Comment',

  });
  return Comment;
};