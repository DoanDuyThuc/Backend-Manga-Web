'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Truyen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Truyen.hasMany(models.Chuong, {
        foreignKey: 'TruyenId',
      });

      Truyen.belongsToMany(models.TheLoai, { through: 'TruyenTheloai' });
    }
  }
  Truyen.init({
    truyen_ma: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    truyen_ten: {
      type: DataTypes.STRING,
      allowNull: false
    },
    truyen_hinhanhdaidien: {
      type: DataTypes.STRING,
      allowNull: false
    },
    truyen_tacgia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    truyen_motangan: {
      type: DataTypes.STRING,
      allowNull: false
    },
    truyen_luotthich: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Mặc định là 0 lượt thích
      allowNull: false
    },
    truyen_luottheodoi: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Mặc định là 0 lượt theo dõi
      allowNull: false
    },
    truyen_luotxem: {
      type: DataTypes.INTEGER,
      defaultValue: 0, // Mặc định là 0 lượt xem
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Truyen',
  });
  return Truyen;
};