'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chuong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chuong.belongsTo(models.Truyen, {
        foreignKey: 'TruyenId',
      });
      Chuong.hasMany(models.chuong_hinhanh, {
        foreignKey: 'ChuongId',
      });
    }
  }
  Chuong.init({
    Chuong_so: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Chuong_ten: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Chuong_noidung: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TruyenId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Chuong',
  });
  return Chuong;
};