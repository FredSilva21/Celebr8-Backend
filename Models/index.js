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

Acompanhante.belongsTo(Convidado, { foreignKey: "id_convidado" });
Convidado.hasMany(Acompanhante, { foreignKey: "id_convidado" });

Despesa.belongsTo(Evento, { foreignKey: "id_evento" });
Evento.hasMany(Despesa, { foreignKey: "id_evento" });

Despesa.belongsTo(Categoria_Despesa, { foreignKey: "categoria_despesa" });
Categoria_Despesa.hasMany(Despesa, { foreignKey: "categoria_despesa" });

Evento.belongsTo(Categoria_Evento, { foreignKey: "categoria_evento" });
Categoria_Evento.hasMany(Evento, { foreignKey: "categoria_evento" });

Evento.belongsToMany(Utilizador, { through: Evento_Utilizador });
Utilizador.belongsToMany(Evento, { through: Evento_Utilizador });

Tarefa.belongsTo(Evento, { foreignKey: "id_evento" });
Evento.hasMany(Tarefa, { foreignKey: "id_evento" });

Tarefa.belongsTo(Utilizador, { foreignKey: "id_utilizador" });
Utilizador.hasMany(Tarefa, { foreignKey: "id_utilizador" });

Mensagem.belongsTo(Utilizador, { foreignKey: "id_utilizador" });
Utilizador.hasMany(Mensagem, { foreignKey: "id_utilizador" });

Mensagem.belongsTo(Evento, { foreignKey: "id_evento" });
Evento.hasMany(Mensagem, { foreignKey: "id_evento" });

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
};