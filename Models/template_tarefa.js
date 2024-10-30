const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Tarefa = require("./tarefa");
const Template_Tarefa = sequelize.define(
  "Template_Tarefa",
  {
    id_template_tarefa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nome_template: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_utilizador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Utilizador",
        key: "id_utilizador",
      },
    },
    id_tarefa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Tarefa,
        key: "id_tarefa",
      },
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    data_fim: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    prioridade: {
      type: DataTypes.ENUM("Baixa", "Média", "Alta"),
      allowNull: false,
      defaultValue: "Média",
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { tableName: "template_tarefa", timestamps: false }
);
module.exports = Template_Tarefa;
