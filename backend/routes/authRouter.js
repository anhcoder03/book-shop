const express = require("express");
const route = express.Router();
const userController = require("../controller/AuthController");
const { verifyTokenAdmin, verifyToken } = require("../middleware/auth");

route.post("/register", userController.register);
route.get("/getUsers", verifyTokenAdmin, userController.getUsers);
route.get("/getUser/:id", verifyTokenAdmin, userController.getUser);
route.post("/login", userController.login);
route.put("/updateUser/:id", verifyTokenAdmin, userController.updateUser);
route.delete("/deleteUser/:id", verifyTokenAdmin, userController.deleteUser);
route.post("/refreshToken", userController.createNewRefreshToken);
route.post("/logout", verifyToken, userController.logout);

module.exports = route;
