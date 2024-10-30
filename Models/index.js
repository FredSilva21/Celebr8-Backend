const sequelize = require("../sequelizeconnection");
const Acompanhante = require("./acompanhante");
const Categoria_Despesa = require("./categoria_despesa");
const Categoria_Evento = require("./categoria_evento");
const Convidado = require("./convidado");
const Despesa = require("./despesa");
const Evento = require("./evento");
const Evento_Utilizador = require("./evento_utilizador");
const Mensagem = require("./mensagem");
const Tarefa= require("./tarefa");
const Utilizador = require("./utilizador");
const Template_Despesa = require("./template_depesa")
const Template_Tarefa = require("./template_tarefa")

Acompanhante.belongsTo(Convidado, { foreignKey: "id_convidado" });
Convidado.hasMany(Acompanhante, { foreignKey: "id_convidado" });

Despesa.belongsTo(Evento, { foreignKey: "id_evento" });
Evento.hasMany(Despesa, { foreignKey: "id_evento" });

Despesa.belongsTo(Categoria_Despesa, { foreignKey: "categoria_despesa" });
Categoria_Despesa.hasMany(Despesa, { foreignKey: "categoria_despesa" });

Evento.belongsTo(Categoria_Evento, { foreignKey: "categoria_evento" });
Categoria_Evento.hasMany(Evento, { foreignKey: "categoria_evento" });

Evento.belongsToMany(Utilizador, { through: Evento_Utilizador , foreignKey: "id_evento" });
Utilizador.belongsToMany(Evento, { through: Evento_Utilizador, foreignKey: "id_utilizador" });

Tarefa.belongsTo(Evento, { foreignKey: "id_evento" });
Evento.hasMany(Tarefa, { foreignKey: "id_evento" });

Tarefa.belongsTo(Utilizador, { foreignKey: "id_utilizador" });
Utilizador.hasMany(Tarefa, { foreignKey: "id_utilizador" });

Mensagem.belongsTo(Utilizador, { foreignKey: "id_utilizador" });
Utilizador.hasMany(Mensagem, { foreignKey: "id_utilizador" });

Mensagem.belongsTo(Evento, { foreignKey: "id_evento" });
Evento.hasMany(Mensagem, { foreignKey: "id_evento" });

Evento.hasMany(Convidado,{foreignKey: "id_evento"});
Convidado.belongsTo(Evento,{foreignKey: "id_evento"});

Template_Despesa.belongsTo(Despesa, { foreignKey: "id_despesa" });
Despesa.hasMany(Template_Despesa, { foreignKey: "id_despesa" });

Template_Tarefa.belongsTo(Tarefa, { foreignKey: "id_tarefa" });
Tarefa.hasMany(Template_Tarefa, { foreignKey: "id_tarefa" });

// Sincronizando as tabelas na ordem correta
Utilizador.sync({ logging: false })
  .then(() => Categoria_Despesa.sync({ logging: false }))
  .then(() => Categoria_Evento.sync({ logging: false }))
  .then(() => Evento.sync({ logging: false }))
  .then(() => Convidado.sync({ logging: false }))
  .then(() => Acompanhante.sync({ logging: false }))
  .then(() => Mensagem.sync({ logging: false }))
  .then(() => Tarefa.sync({ logging: false }))
  .then(() => Evento_Utilizador.sync({ logging: false }))
  .then(() => Despesa.sync({ logging: false }))
  .then(() => Template_Despesa.sync({ logging: false }))
  .then(() => Template_Tarefa.sync({ logging: false }))
  .then(() => {
    console.log("All tables created successfully.");
  })
  .catch((err) => {
    console.error("Error creating tables:", err);
  });

module.exports = {
    Acompanhante,
    Categoria_Despesa,
    Categoria_Evento,
    Convidado,
    Despesa,
    Evento,
    Evento_Utilizador,
    Mensagem,
    Tarefa,
    Utilizador,
    Template_Despesa,
    Template_Tarefa
};