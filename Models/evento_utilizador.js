const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Evento_UTilizador = sequelize.define(
  "Evento Utilizador",
  {
    id_evento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      reference: {
        model: "Evento",
        key: "id_evento",
      },
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      reference: {
        model: "Utilizador",
        key: "id_utilizador",
      },
    },
    tipo_utilizador: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "evento_utilizador", timestamps: false }
);
Evento_UTilizador.sync({ logging: false });
module.exports = Evento_UTilizador;
