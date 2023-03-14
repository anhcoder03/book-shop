const webRouter = require("./webRouter");

function router(app) {
  app.post("/register", webRouter);
  app.get("/getUsers", webRouter);
  app.get("/getUser", webRouter);
  app.post("/login", webRouter);
  app.put("/updateUser/:id", webRouter);
  app.delete("/deleteUser/:id", webRouter);
}

module.exports = router;
