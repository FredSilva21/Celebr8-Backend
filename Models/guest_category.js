const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Guest_Category = sequelize.define(
  "Guest Category",
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
  { tableName: "guest_category", timestamps: false }
);
module.exports = Guest_Category;