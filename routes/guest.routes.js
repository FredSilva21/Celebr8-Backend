const express = require("express");
const router = express.Router();
const GuestController = require("../controllers/guest.controller");
const {verifyUser,verifySameUser} = require("../Middleware/jwt");
router
  .get(
    "/users/:userId/events/:eventId/guests",verifyUser,verifySameUser,
    GuestController.getAllEventGuests
  )
  .post(
    "/users/:userId/events/:eventId/guests",verifyUser,verifySameUser,
    GuestController.createEventGuest
  );

router
  .get(
    "/users/:userId/events/:eventId/guests/:guestId",verifyUser,verifySameUser,
    GuestController.getEventGuestById
  )
  .put(
    "/users/:userId/events/:eventId/guests/:guestId",verifyUser,verifySameUser,
    GuestController.editEventGuest
  )
  .delete(
    "/users/:userId/events/:eventId/guests/:guestId",
    GuestController.deleteEventGuest
  );

module.exports = router;
