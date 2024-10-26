const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Convidado = sequelize.define(
  "Convidado",
  {
    id_convidado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_evento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: "Evento",
        key: "id_evento",
      },
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "Convidado",timestamps: false },
);
module.exports = Convidado;