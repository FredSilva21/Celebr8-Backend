const express = require("express");
const router = express.Router();
const EventController = require("../controllers/event.controller");
const {verifyUser,verifySameUser} = require("../Middleware/jwt");

router
.get("/user/:userId/events",verifyUser,verifySameUser, EventController.getAllUserEvents)
.post("/user/:userId/events",verifyUser,verifySameUser,EventController.createUserEvent);

router
  .get("/user/:userId/events/:eventId",verifyUser,verifySameUser, EventController.getEventById)
  .put("/user/:userId/events/:eventId", verifyUser,verifySameUser,EventController.updateEvent)
  .delete("/user/:userId/events/:eventId",verifyUser,verifySameUser, EventController.deleteEvent);

module.exports = router;