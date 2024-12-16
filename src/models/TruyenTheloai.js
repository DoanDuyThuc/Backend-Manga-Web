'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TruyenTheloai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  TruyenTheloai.init({
    TruyenId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    TheLoaiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TruyenTheloai',
    tableName: 'TruyenTheLoai',

  });
  return TruyenTheloai;
};