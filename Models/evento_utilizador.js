const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Evento_UTilizador = sequelize.define(
  "Evento Utilizador",
  {
    tipo_utilizador: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "evento_utilizador", timestamps: false }
);
module.exports = Evento_UTilizador;
