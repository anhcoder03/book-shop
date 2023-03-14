const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/book-shop", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("success");
  } catch (err) {
    console.log("err");
  }
}

module.exports = { connect };
