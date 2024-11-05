'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TruyenYeuThich extends Model {
    static associate(models) {
      // Tạo mối quan hệ với User
      TruyenYeuThich.belongsTo(models.User, {
        foreignKey: 'UserId',
      });

      // Tạo mối quan hệ với Truyen
      TruyenYeuThich.belongsTo(models.Truyen, {
        foreignKey: 'TruyenId',
      });
    }
  }

  TruyenYeuThich.init({
    TruyenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Truyen', // Tên bảng của model Truyen
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User', // Tên bảng của model User
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'TruyenYeuThich',
  });

  return TruyenYeuThich;
};