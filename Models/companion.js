const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Companion = sequelize.define(
  "Companion",
  {
    companion_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "companion",timestamps: false },
);
module.exports = Companion;