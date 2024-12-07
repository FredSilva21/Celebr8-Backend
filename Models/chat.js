const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Chat = sequelize.define(
  "Chat",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: "chat", timestamps: false }
);
module.exports = Chat;
