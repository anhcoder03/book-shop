const express = require("express");
const route = express.Router();
const userController = require("../controller/AuthController");

route.post("/register", userController.register);
route.get("/getUsers", userController.getUsers);
route.get("/getUser/:id", userController.getUser);
route.post("/login", userController.login);
route.put("/updateUser/:id", userController.updateUser);
route.delete("/deleteUser/:id", userController.deleteUser);

module.exports = route;
