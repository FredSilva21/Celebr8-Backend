const express = require("express");
const router = express.Router();
const CostController = require("../controllers/cost.controller");
const {verifyUser,verifySameUser} = require("../Middleware/jwt");

router
.get("/users/:userId/events/costs",verifyUser,verifySameUser, CostController.getAllEventCosts)
.post("/users/:userId/events/costs",verifyUser,verifySameUser,CostController.createEventCost);

module.exports = router;