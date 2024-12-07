const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Cost_Template = sequelize.define(
  "Template Despesa",
  {
    template_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    template_name: {
      type: DataTypes.STRING,
      allowNull: false
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
      type: DataTypes.ENUM("Total", "Parcial com Colaboradores", "Parcial"),
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "cost_template", timestamps: false }
);
module.exports = Cost_Template;
