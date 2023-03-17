const express = require("express");
const route = express.Router();
const ProductController = require("../controller/ProductController");

route.post("/create_product", ProductController.createProduct);
route.put("/update_product/:id", ProductController.updateProduct);
route.get("/getProductAll", ProductController.getProductAll);
route.get("/getProduct/:id", ProductController.getProduct);
route.delete("/delete_product/:id", ProductController.deleteProduct);
route.get(
  "/product_of_category/:category",
  ProductController.getProductByCategory
);
// route.put("/update_category/:id", CategoryController.updateCate);
// route.delete("/delete_category/:id", CategoryController.deleteCate);
// route.get("/get_category_all", CategoryController.getCateAll);
// route.get("/get_category/:id", CategoryController.getCateById);

module.exports = route;
