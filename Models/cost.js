const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Cost = sequelize.define(
  "Cost",
  {
    cost_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.ENUM("Total", "Per Person", "Per Group"),
      defaultValue: "Total",
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "cost", timestamps: false }
);
module.exports = Cost;