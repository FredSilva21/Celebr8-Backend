const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Despesa = require("./despesa");
const Template_Despesa = sequelize.define(
  "Template Despesa",
  {
    id_template_despesa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_template: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Utilizador",
        key: "id_utilizador",
      },
    },
    id_despesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Despesa,
        key: "id_despesa",
      },
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
  { tableName: "template_despesa", timestamps: false }
);
module.exports = Template_Despesa;
