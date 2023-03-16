const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    title: { type: String, require: true },
    author: { type: String, require: true },
    desc: { type: String, require: true },
    year: { type: Number, require: true },
    review_count: { type: Number },
    average_score: { type: Number },
    categoryName: { type: String, require: true },
    slug: { type: String, slug: "title" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", Product);
