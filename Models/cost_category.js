const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Cost_Category = sequelize.define(
  "Cost Category",
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
  { tableName: "cost_category", timestamps: false }
);
module.exports = Cost_Category;