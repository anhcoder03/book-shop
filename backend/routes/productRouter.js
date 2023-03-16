const express = require("express");
const route = express.Router();
const ProductController = require("../controller/ProductController");

route.post("/create_product", ProductController.createProduct);
// route.put("/update_category/:id", CategoryController.updateCate);
// route.delete("/delete_category/:id", CategoryController.deleteCate);
// route.get("/get_category_all", CategoryController.getCateAll);
// route.get("/get_category/:id", CategoryController.getCateById);

module.exports = route;
