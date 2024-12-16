'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThongBaoToAdmin extends Model {
    static associate(models) {
      ThongBaoToAdmin.belongsTo(models.User, {
        foreignKey: 'UserId'
      });
    }
  }
  ThongBaoToAdmin.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false
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
    }
  }, {
    sequelize,
    modelName: 'ThongBaoToAdmin',
    tableName: 'ThongBaoToAdmin'
  });
  return ThongBaoToAdmin;
};