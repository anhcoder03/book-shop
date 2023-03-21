const express = require("express");
const route = express.Router();
const userController = require("../controller/AuthController");
const CategoryController = require("../controller/CategoryController");
const ProductController = require("../controller/ProductController");
const { verifyTokenAdmin, verifyToken } = require("../middleware/auth");

function router(app) {
  //auth
  route.post("/register", userController.register);
  route.get("/getUsers", userController.getUsers);
  route.get("/getUser/:id", userController.getUser);
  route.post("/login", userController.login);
  route.put("/updateUser/:id", verifyTokenAdmin, userController.updateUser);
  route.delete("/deleteUser/:id", verifyTokenAdmin, userController.deleteUser);
  route.post("/refreshToken", userController.createNewRefreshToken);
  route.post("/logout", verifyToken, userController.logout);

  //category

  route.post("/create_category", CategoryController.createCate);
  route.put("/update_category/:id", CategoryController.updateCate);
  route.delete("/delete_category/:id", CategoryController.deleteCate);
  route.get("/get_category_all", CategoryController.getCateAll);
  route.get("/get_category/:id", CategoryController.getCateById);

  //product
  route.post("/create_product", ProductController.createProduct);
  route.put("/update_product/:id", ProductController.updateProduct);
  route.get("/getProductAll", ProductController.getProductAll);
  route.get("/getProduct/:slug", ProductController.getProduct);
  route.delete("/delete_product/:id", ProductController.deleteProduct);
  route.get(
    "/product_of_category/:category",
    ProductController.getProductByCategory
  );
  return app.use(route);
}

module.exports = router;
