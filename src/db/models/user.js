"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Booking);
    }
  }
  User.init(
    {
      RoleId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      photo: DataTypes.STRING,
      cloudinary_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
