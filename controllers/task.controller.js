const { Event_User, Event, Task } = require("../models/index");

//DONE
exports.getAllEventTasks = async (req, res) => {
  const { userId, eventId } = req.params;

  try {
    if (
      !(await Event_User.findOne({
        where: { user_id: userId, event_id: eventId },
      }))
    ) {
      return res.status(404).json({ error: "User is not part of this event" });
    }

    const tasks = await Task.findAll({
      where: { event_id: eventId },
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
  const { title, description, start_date, end_date, priority } = req.body;

  try {
    if (!title || !description || !start_date || !end_date || !priority) {
      return res.status(400).json({
        error: "Missing fields. All fields must be sent in the body request!",
      });
    }

    if (
      !(await Event_User.findOne({
        where: { user_id: userId, event_id: eventId },
      }))
    ) {
      return res.status(404).json({ error: "User is not part of this event" });
    }

    const task=await Task.create({
      event_id: eventId,
      user_id: userId,
      title,
      description,
      start_date,
      end_date,
      priority,
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
      !(await Event_User.findOne({
        where: { user_id: userId, event_id: eventId },
      }))
    ) {
      return res.status(404).json({ error: "User is not part of this event" });
    }

    const task = await Task.findOne({
      where: { task_id: taskId },
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
  const { title, description, start_date, end_date, priority } = req.body;

  try {
    if (!title || !description || !start_date || !end_date || !priority) {
      return res.status(400).json({
        error: "Missing fields. All fields must be sent in the body request!",
      });
    }

    if (
      !(await Event_User.findOne({
        where: { user_id: userId, event_id: eventId },
      }))
    ) {
      return res.status(404).json({ error: "User is not part of this event" });
    }

    const task = await Task.findOne({
      where: { task_id: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await Task.update(
      {
        title,
        description,
        start_date,
        end_date,
        priority,
        user_id: userId,
      },
      {
        where: { task_id: taskId },
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
      !(await Event_User.findOne({
        where: { user_id: userId, event_id: eventId },
      }))
    ) {
      return res.status(404).json({ error: "User is not part of this event" });
    }

    const task = await Task.findOne({
      where: { task_id: taskId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await Task.destroy({
      where: { task_id: taskId },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Something went wrong...", details: error });
  }
};