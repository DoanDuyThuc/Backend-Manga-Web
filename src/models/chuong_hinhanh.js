'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chuong_hinhanh extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      chuong_hinhanh.belongsTo(models.Chuong, {
        foreignKey: 'ChuongId',
      });
    }
  }
  chuong_hinhanh.init({
    ChuongId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    chuong_hinhanh_link: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'chuong_hinhanh',
  });
  return chuong_hinhanh;
};