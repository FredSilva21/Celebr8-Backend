const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const {verifyUser,verifySameUser} = require("../Middleware/jwt");

router.get("/users/:userId",verifyUser,verifySameUser, UserController.getUserById)
.put("/users/:userId",verifyUser,verifySameUser, UserController.editUser)
.delete("/users/:userId",verifyUser,verifySameUser, UserController.deleteUser);

module.exports = router;