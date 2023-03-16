const express = require("express");
const route = express.Router();
const CategoryController = require("../controller/CategoryController");

route.post("/create_category", CategoryController.createCate);
route.put("/update_category/:id", CategoryController.updateCate);
route.delete("/delete_category/:id", CategoryController.deleteCate);
route.get("/get_category_all", CategoryController.getCateAll);
route.get("/get_category/:id", CategoryController.getCateById);

module.exports = route;
