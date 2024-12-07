const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Message = sequelize.define(
  "Message",
  {
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  { tableName: "message", timestamps: false }
);
module.exports = Message;