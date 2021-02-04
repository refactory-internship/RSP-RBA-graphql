"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PhotoRooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhotoRooms.belongsTo(models.Room, {
        onDelete: "CASCADE",
      });
    }
  }
  PhotoRooms.init(
    {
      photo: DataTypes.STRING,
      cloudinary_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PhotoRooms",
    }
  );
  return PhotoRooms;
};
