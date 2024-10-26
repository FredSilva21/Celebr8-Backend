const express = require("express");
const router = express.Router();
const CompanionController = require("../controllers/companion.controller");
const {verifyUser,verifySameUser} = require("../Middleware/jwt");
router
  .post(
    "/users/:userId/events/:eventId/guests/:guestId/companion",verifyUser,verifySameUser,
    CompanionController.createGuestCompanion
  );

router
  .put(
    "/users/:userId/events/:eventId/guests/:guestId/companion/:companionId",verifyUser,verifySameUser,
    CompanionController.editGuestCompanion
  )

module.exports = router;
