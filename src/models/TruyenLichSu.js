'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TruyenLichSu extends Model {
    static associate(models) {
      // Tạo mối quan hệ với User
      TruyenLichSu.belongsTo(models.User, {
        foreignKey: 'UserId',
      });

      // Tạo mối quan hệ với Truyen
      TruyenLichSu.belongsTo(models.Truyen, {
        foreignKey: 'TruyenId',
      });
    }
  }

  TruyenLichSu.init({
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
    modelName: 'TruyenLichSu',
    tableName: 'TruyenLichSu',
  });

  return TruyenLichSu;
};