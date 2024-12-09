const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");

router.post("/refresh", AuthController.refreshTokenHandler);

router.post("/login",AuthController.login);
router.post("/register",AuthController.register);

// router.post("/forgot",AuthController.forgotPassword);
// router.post("/reset",AuthController.resetPassword)

module.exports = router;