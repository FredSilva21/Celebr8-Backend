const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event.controller");
const {verifyUser,verifySameUser} = require("../middleware/jwt");

router
.get("/users/:userId/events",verifyUser,verifySameUser, EventController.getAllUserEvents)
.post("/users/:userId/events",verifyUser,verifySameUser,EventController.createUserEvent);

router
  .get("/users/:userId/events/:eventId",verifyUser,verifySameUser, EventController.getEventById)
  .put("/users/:userId/events/:eventId", verifyUser,verifySameUser,EventController.updateEvent)
  .delete("/users/:userId/events/:eventId",verifyUser,verifySameUser, EventController.deleteEvent);

module.exports = router;