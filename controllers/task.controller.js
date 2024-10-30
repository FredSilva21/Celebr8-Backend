const { Evento_Utilizador, Evento, Tarefa } = require("../Models/index");

//DONE
exports.getAllEventTasks = async (req, res) => {
  const { userId, eventId } = req.params;

  try {
    if (
      !(await Evento_Utilizador.findOne({
        where: { id_utilizador: userId, id_evento: eventId },
      }))
    ) {
      return res.status(404).json({ error: "User is not part of this event" });
    }

    const tasks = await Tarefa.findAll({
      where: { id_evento: eventId },
    });

    res
      .status(200)
      .json({ message: "Retrived all event tasks", result: tasks });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};

//DONE
exports.createEventTask = async (req, res) => {
  const { userId, eventId } = req.params;
  const { titulo, descricao, data_inicio, data_fim, prioridade } = req.body;

  try {
    if (!titulo || !descricao || !data_inicio || !data_fim || !prioridade) {
      return res.status(400).json({
        error: "Missing fields. All fields must be sent in the body request!",
      });
    }

    if (
      !(await Evento_Utilizador.findOne({
        where: { id_utilizador: userId, id_evento: eventId },
      }))
    ) {
      return res.status(404).json({ error: "User is not part of this event" });
    }

    const task=await Tarefa.create({
      id_evento: eventId,
      id_utilizador: userId,
      titulo,
      descricao,
      data_inicio,
      data_fim,
      prioridade,
    });

    res
      .status(201)
      .json({ message: "Task created successfully", result: task });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};

exports.getTaskById = async (req, res) => {
  const { userId, eventId, taskId } = req.params;

  try {
    if (
      !(await Evento_Utilizador.findOne({
        where: { id_utilizador: userId, id_evento: eventId },
      }))
    ) {
      return res.status(404).json({ error: "User is not part of this event" });
    }

    const task = await Tarefa.findOne({
      where: { id_tarefa: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Retrived task", result: task });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};

exports.editTask = async (req, res) => {
  const { userId, eventId, taskId } = req.params;
  const { titulo, descricao, data_inicio, data_fim, prioridade } = req.body;

  try {
    if (!titulo || !descricao || !data_inicio || !data_fim || !prioridade) {
      return res.status(400).json({
        error: "Missing fields. All fields must be sent in the body request!",
      });
    }

    if (
      !(await Evento_Utilizador.findOne({
        where: { id_utilizador: userId, id_evento: eventId },
      }))
    ) {
      return res.status(404).json({ error: "User is not part of this event" });
    }

    const task = await Tarefa.findOne({
      where: { id_tarefa: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await Tarefa.update(
      {
        titulo,
        descricao,
        data_inicio,
        data_fim,
        prioridade,
        id_utilizador: userId,
      },
      {
        where: { id_tarefa: taskId },
      }
    );

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};

exports.deleteTask = async (req, res) => {
  const { userId, eventId, taskId } = req.params;

  try {
    if (
      !(await Evento_Utilizador.findOne({
        where: { id_utilizador: userId, id_evento: eventId },
      }))
    ) {
      return res.status(404).json({ error: "User is not part of this event" });
    }

    const task = await Tarefa.findOne({
      where: { id_tarefa: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await Tarefa.destroy({
      where: { id_tarefa: taskId },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};