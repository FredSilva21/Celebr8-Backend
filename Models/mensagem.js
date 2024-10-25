const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Mensagem = sequelize.define(
  "Mensagem",
  {
    id_chat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: "Utilizador",
        key: "id_utilizador",
      },
    },
    id_evento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: "Evento",
        key: "id_evento",
      },
    },
    mensagem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: "mensagem", timestamps: false }
);
Mensagem.sync({ logging: false });
module.exports = Mensagem;
