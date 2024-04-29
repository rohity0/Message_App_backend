const express = require("express");
const userRoute = express.Router();
const userController = require("../Controllers/user.controller");
const { validateUser } = require("../middleware/authMiddleware");

userRoute.post("/register", userController.registerUser);
userRoute.put("/profile/:userId", validateUser, userController.updateProfile);
userRoute.post("/login", userController.userLogin);
userRoute.get("/", validateUser, userController.getUsers);

module.exports = userRoute;
