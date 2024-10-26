const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Despesa = sequelize.define(
  "Despesa",
  {
    id_despesa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tipoPagamento: {
      type: DataTypes.ENUM("Total", "Parcial com Colaboradores", "Parcial"),
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "despesa", timestamps: false }
);
module.exports = Despesa;
