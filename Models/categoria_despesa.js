const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Categoria_Despesa = sequelize.define(
  "Categoria Evento",
  {
    id_categoria_despesa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "categoria_despesa", timestamps: false }
);
module.exports = Categoria_Despesa;
