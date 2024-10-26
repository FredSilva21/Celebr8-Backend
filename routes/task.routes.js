const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/task.controller");
const { verifyUser, verifySameUser } = require("../Middleware/jwt");

router
  .get(
    "/user/:userId/events/:eventId/tasks",
    verifyUser,
    verifySameUser,
    TaskController.getAllEventTasks
  )
  .post(
    "/user/:userId/events/:eventId/tasks",
    verifyUser,
    verifySameUser,
    TaskController.createEventTask
  );

router
.get("/user/:userId/events/:eventId/tasks/:taskId",verifyUser,verifySameUser, TaskController.getTaskById)
.put("/user/:userId/events/:eventId/tasks/:taskId",verifyUser,verifySameUser, TaskController.editTask)
.delete("/user/:userId/events/:eventId/tasks/:taskId",verifyUser,verifySameUser, TaskController.deleteTask)

module.exports = router;
