const express = require("express");
const authController = require("../../controller/auth/authCtr");  //authController
const authMiddleware = require("../../services/authMdlWr/authMiddleware"); //  this middleware

const router = express.Router();

router.post("/register", authMiddleware.authenticate, authController.register);
router.post("/login", authController.login);
router.get("/profile", authMiddleware.authenticate, authController.getUserProfile);
router.get("/logout", authMiddleware.authenticate, authController.logOut);

//Route to get all user details
router.get("/users", authMiddleware.authenticate, authController.getAllUsers);

// Route to update user information
router.put("/users/:id", authMiddleware.authenticate, authController.updateUser);

// Route to delete a user
router.delete("/users/:id", authMiddleware.authenticate, authController.deleteUser);


module.exports = router;
