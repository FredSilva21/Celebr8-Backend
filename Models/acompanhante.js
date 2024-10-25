const sequelize = require("../sequelizeconnection");
const { Sequelize, DataTypes } = require("sequelize");
const Acompanhante = sequelize.define(
  "Acompanhante",
  {
    id_acompanhante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_convidado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: "Convidado",
        key: "id_convidado",
      },
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: "Acompanhante",timestamps: false },
);
Acompanhante.sync({ logging: false })
module.exports = Acompanhante;