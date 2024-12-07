const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Event = sequelize.define(
  "Event",
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guests_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    costs_limit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { tableName: "event", timestamps: false }
);
module.exports = Event;
