const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Refresh_Token= sequelize.define(
  "Refresh_Token",
  {
    token_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  { tableName: "refresh_token", timestamps: false }
);
module.exports = Refresh_Token;
