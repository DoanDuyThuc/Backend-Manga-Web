'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TheLoai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TheLoai.belongsToMany(models.Truyen, { through: 'TruyenTheloai' });
    }
  }
  TheLoai.init({
    ten_theloai: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'TheLoai',
  });
  return TheLoai;
};