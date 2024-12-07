const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/task.controller");
const { verifyUser, verifySameUser } = require("../middleware/jwt");

router
  .get(
    "/users/:userId/events/:eventId/tasks",
    verifyUser,
    verifySameUser,
    TaskController.getAllEventTasks
  )
  .post(
    "/users/:userId/events/:eventId/tasks",
    verifyUser,
    verifySameUser,
    TaskController.createEventTask
  );

router
.get("/users/:userId/events/:eventId/tasks/:taskId",verifyUser,verifySameUser, TaskController.getTaskById)
.put("/users/:userId/events/:eventId/tasks/:taskId",verifyUser,verifySameUser, TaskController.editTask)
.delete("/users/:userId/events/:eventId/tasks/:taskId",verifyUser,verifySameUser, TaskController.deleteTask)

module.exports = router;