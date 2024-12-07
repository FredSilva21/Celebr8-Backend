const sequelize = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");
const Event_User = sequelize.define(
  "Event User",
  {
    user_type: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "event_user", timestamps: false }
);
module.exports = Event_User;