const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Categoria_Despesa = sequelize.define(
  "Categoria Evento",
  {
    id_categoria: {
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
Categoria_Despesa.sync({ logging: false });
module.exports = Categoria;
