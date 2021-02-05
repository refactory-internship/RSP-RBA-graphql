"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        onDelete: 'CASCADE'
      });
      Booking.belongsTo(models.Room, {
        onDelete: 'CASCADE'
      });
    }
  }
  Booking.init(
    {
      total_person: DataTypes.INTEGER,
      booking_time: DataTypes.DATE,
      note: DataTypes.TEXT,
      check_in_time: DataTypes.DATE,
      check_out_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
