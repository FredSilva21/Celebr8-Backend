const { Event_User, Event } = require("../Models/index");
const { generateEventId } = require("../utils/idGenerator");

/* The `exports.getAllUserEvents` function is responsible for retrieving all events associated with a
specific user. Here's a breakdown of what the function does: */
exports.getAllUserEvents = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  try {
    const events = await Event_User.findAll({
      where: { user_id: userId },
    });

    res.status(200).json({ message:"Retrived all users events", result: events });
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};

/* The `exports.createUserEvent` function is responsible for creating a new event associated with a
specific user. Here is a breakdown of what the function does: */
exports.createUserEvent = async (req, res) => {
  const { userId } = req.params;
  const { name, date, location, costs_limit, guests_limit } = req.body;

  const event_id = await generateEventId();
  try {
    const event = await Event.create({
      event_id,
      name,
      date,
      location,
      costs_limit,
      guests_limit,
    });

    await Event_User.create({
      user_id: userId,
      event_id: event.event_id,
      user_type: true,
    });

    res.status(201).json({
      success: "Event created successfully",
      result: event,
    });
  } catch (error) {
    console.log("ERRO",error);
    res.status(500).send({
      message: "Something went wrong. Please try again later",
      details: error,
    });
  }
};

/* The `exports.getEventById` function is responsible for retrieving a specific event associated with a
user. Here is a breakdown of what the function does: */
exports.getEventById = async (req, res) => {
  const { userId, eventId } = req.params;

  try {
    const findUserEvent = await Event_User.findOne({
      where: { user_id: userId, event_id: eventId },
    });

    if (!findUserEvent) {
      return res.status(404).send({ message: "Event not found" });
    }

    const event = await Event.findByPk(eventId);

    res.status(200).json({ message:"Retrieved user event successfully ",result: event });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};

/* The `exports.updateEvent` function is responsible for updating an existing event associated with a
specific user. Here is a breakdown of what the function does: */
exports.updateEvent = async (req, res) => {
  const { userId, eventId } = req.params;
  const { name, date, location, guests_limit, costs_limit  } = req.body;

  try {
    const findUserEvent = await Event_User.findOne({
      where: { user_id: userId, event_id: eventId },
    });

    if (!findUserEvent) {
      return res.status(404).send({ message: "Event not found" });
    }

    await Event.update(
      {
        name,
        date,
        location,
        guests_limit,
        costs_limit,
      },
      { where: { event_id: eventId } }
    );

    res.status(200).json({ message: "Event updated successfully"});
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};


/* The `exports.deleteEvent` function is responsible for deleting an event associated with a specific
user. Here is a breakdown of what the function does: */
exports.deleteEvent = async (req, res) => {
  const { userId, eventId } = req.params;

  try {
    const findUserEvent = await Event_User.findOne({
      where: { user_id: userId, event_id: eventId },
    });

    if (!findUserEvent) {
      return res.status(404).send({ message: "Event not found" });
    }
    findUserEvent.destroy();
    await Event.destroy({ where: { event_id: eventId } });

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};