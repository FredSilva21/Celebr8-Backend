const { Evento_Utilizador, Evento } = require("../Models/index");
const { generateEventId } = require("../utils/idGenerator");

//DONE
exports.getAllUserEvents = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await Evento_Utilizador.findAll({
      where: { id_utilizador: userId },
    });

    res.status(200).json({ message:"Retrived all users events", result: events });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};

//DONE
exports.createUserEvent = async (req, res) => {
  const { userId } = req.params;
  const { nome, data, local, limite_despesas, limite_participantes } = req.body;

  const id_evento = await generateEventId();
  try {
    const event = await Evento.create({
      id_evento: id_evento,
      nome_evento: nome,
      data_evento: data,
      local_evento: local,
      limite_despesas: limite_despesas,
      limite_participantes: limite_participantes,
    });

    await Evento_Utilizador.create({
      id_utilizador: userId,
      id_evento: event.id_evento,
      tipo_utilizador: true,
    });

    res.status(201).json({
      success: "Event created successfully",
      Event: event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong. Please try again later",
      details: error,
    });
  }
};

//DONE
exports.getEventById = async (req, res) => {
  const { userId, eventId } = req.params;

  try {
    const findUserEvent = await Evento_Utilizador.findOne({
      where: { id_utilizador: userId, id_evento: eventId },
    });

    if (!findUserEvent) {
      return res.status(404).send({ message: "Event not found" });
    }

    const event = await Evento.findByPk(eventId);

    res.status(200).json({ message:"Retrieved user event successfully ",result: event });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};

//DONE
exports.updateEvent = async (req, res) => {
  const { userId, eventId } = req.params;
  const { nome, data, local, limite_despesas, limite_participantes } = req.body;

  try {
    const findUserEvent = await Evento_Utilizador.findOne({
      where: { id_utilizador: userId, id_evento: eventId },
    });

    if (!findUserEvent) {
      return res.status(404).send({ message: "Event not found" });
    }

    await Evento.update(
      {
        nome_evento: nome,
        data_evento: data,
        local_evento: local,
        limite_despesas: limite_despesas,
        limite_participantes: limite_participantes,
      },
      { where: { id_evento: eventId } }
    );

    res.status(200).json({ message: "Event updated successfully"});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};

//DONE
exports.deleteEvent = async (req, res) => {
  const { userId, eventId } = req.params;

  try {
    const findUserEvent = await Evento_Utilizador.findOne({
      where: { id_utilizador: userId, id_evento: eventId },
    });

    if (!findUserEvent) {
      return res.status(404).send({ message: "Event not found" });
    }
    findUserEvent.destroy();
    await Evento.destroy({ where: { id_evento: eventId } });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};
