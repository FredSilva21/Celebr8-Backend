const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Guest = sequelize.define(
  "Guest",
  {
    guest_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "Guest",timestamps: false },
);
module.exports = Guest;