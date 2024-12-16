'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Truyen, {
        foreignKey: 'UserId',
      });

      User.hasMany(models.TruyenYeuThich, {
        foreignKey: 'UserId',
      });

      User.hasMany(models.TruyenLichSu, {
        foreignKey: 'UserId',
      });

      User.hasMany(models.Comment, {
        foreignKey: 'UserId',
      });

      User.hasMany(models.RepComment, {
        foreignKey: 'UserId'
      });

      User.hasMany(models.ThongBaoToAdmin, {
        foreignKey: 'UserId'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin', 'author'),
      allowNull: false,
      defaultValue: 'user'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

  }, {
    sequelize,
    modelName: 'User',
    tableName: 'User',

  });
  return User;
};