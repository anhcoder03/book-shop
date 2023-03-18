const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8080;
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
app.use(express.urlencoded());
app.use(express.json());
const router = require("./routes");
const db = require("./database/connectDB");
const compression = require("compression");
db.connect();
dotenv.config();
//HTTP logger
app.use(morgan("combined"));
app.use(cookieParser());
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
