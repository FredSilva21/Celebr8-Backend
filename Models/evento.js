const { ref } = require("vue");
const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Evento = sequelize.define(
  "Evento",
  {
    id_evento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true
    },
    nome_evento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_evento: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    local_evento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    limite_participantes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    limite_despesas: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  { tableName: "evento", timestamps: false }
);
module.exports = Evento;
