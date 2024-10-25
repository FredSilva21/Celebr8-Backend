const { ref } = require("vue");
const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Evento = sequelize.define(
  "Evento",
  {
    id_evento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    categoria_evento: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "categoria",
        key: "id_categoria",
      },
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
Evento.sync({ logging: false });
module.exports = Evento;
