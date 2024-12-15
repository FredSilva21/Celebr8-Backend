const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Task_Template = sequelize.define(
  "Template_Tarefa",
  {
    template_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    template_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    priority: {
      type: DataTypes.ENUM("Low", "Medium", "High"),
      allowNull: false,
      defaultValue: "Medium",
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "task_template", timestamps: false }
);
module.exports = Task_Template;
