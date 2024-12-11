const express = require("express");
const router = express.Router();
const CostController = require("../controllers/cost.controller");
const {verifyUser,verifySameUser} = require("../Middleware/jwt");

router
.get("/users/:userId/events/:eventId/costs",verifyUser,verifySameUser, CostController.getAllEventCosts)
.post("/users/:userId/events/:eventId/costs",verifyUser,verifySameUser,CostController.createEventCost);

router
.get("/users/:userId/events/:eventId/costs/:costId",verifyUser,verifySameUser,CostController.getEventCost)
.put("/users/:userId/events/:eventId/costs/:costId",verifyUser,verifySameUser,CostController.editEventCost)
.delete("/users/:userId/events/:eventId/costs/:costId",verifyUser,verifySameUser,CostController.deleteEventCost);

module.exports = router;