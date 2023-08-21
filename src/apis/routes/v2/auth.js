const express = require("express");
const authController = require("../../controller/auth/authCtr");  //authController
const authMiddleware = require("../../services/authMdlWr/authMiddleware"); //  this middleware

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authMiddleware.authenticate, authController.getUserProfile);
router.get("/logout", authMiddleware.authenticate, authController.logOut);

module.exports = router;
