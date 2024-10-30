const { Template_Tarefa, Tarefa, Despesa } = require("../Models/index");

exports.getAllUserTasksTemplates = async (req, res) => {
  const { userId } = req.params;
  try {
    const templates = await Template_Tarefa.findAll({
      where: { id_utilizador: userId },
    });

    res
      .status(200)
      .json({ message: "Retrived all user task templates", result: templates });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};

exports.createTaskTemplate = async (req, res) => {
  const { userId } = req.params;
  const { id_tarefa, nome_template } = req.body;
  try {
    const task = await Tarefa.findByPk(id_tarefa);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const template = await Template_Tarefa.create({
      nome_template: nome_template,
      id_utilizador: userId,
      id_tarefa: id_tarefa,
      titulo: task.titulo,
      descricao: task.descricao,
      data_inicio: task.data_inicio,
      data_fim: task.data_fim,
      prioridade: task.prioridade,
      estado: task.estado,
    });

    res
      .status(201)
      .json({ message: "Task template created", result: template });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};