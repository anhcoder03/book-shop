const authRouter = require("./authRouter");
const categoryRouter = require("./categoryRouter");
const productRouter = require("./productRouter");

function router(app) {
  //auth
  app.post("/register", authRouter);
  app.get("/getUsers", authRouter);
  app.get("/getUser/:id", authRouter);
  app.post("/login", authRouter);
  app.put("/updateUser/:id", authRouter);
  app.delete("/deleteUser/:id", authRouter);

  //category

  app.post("/create_category", categoryRouter);
  app.put("/update_category/:id", categoryRouter);
  app.delete("/delete_category/:id", categoryRouter);
  app.get("/get_category_all", categoryRouter);
  app.get("/get_category/:id", categoryRouter);

  //product

  app.post("/create_product", productRouter);
}

module.exports = router;
