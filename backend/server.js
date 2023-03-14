const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8080;
app.use(express.urlencoded());
app.use(express.json());
const router = require("./routes");
const db = require("./database/connectDB");
const compression = require("compression");
const cors = require("cors");
db.connect();
//HTTP logger
app.use(morgan("combined"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
  })
);
router(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
