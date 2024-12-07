const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Event_Category = sequelize.define(
  "Event Category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "event_category", timestamps: false }
);
module.exports = Event_Category;