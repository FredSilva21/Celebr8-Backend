const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Categoria_Evento = sequelize.define(
  "Categoria Evento",
  {
    id_categoria_evento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "categoria_evento", timestamps: false }
);
Categoria_Evento.sync({ logging: false });
module.exports = Categoria_Evento;
