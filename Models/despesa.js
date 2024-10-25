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
    valor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    tipoPagamento: {
      type: DataTypes.ENUM("Total", "Parcial com Colaboradores", "Parcial"),
    },
    categoria_despesa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: "Categoria Despesa",
        key: "id_categoria",
      },
    },

    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "despesa", timestamps: false }
);
Despesa.sync({ logging: false });
module.exports = Despesa;
