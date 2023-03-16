const Product = require("../models/Product");
const slugify = require("slugify");

class ProductController {
  createProduct(req, res, next) {
    const formData = req.body;
    if (
      !formData.title ||
      !formData.author ||
      !formData.desc ||
      !formData.year ||
      !formData.review_count ||
      !formData.average_score
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Vui lòng điền đầy đủ thông tin!" });
    }
    Product.findOne({ title: formData.title })
      .then((data) => {
        if (data) {
          res.status(400).json({
            success: false,
            message: "Sản phẩm đã tồn tại!",
          });
        } else {
          return Product.create(formData);
        }
      })
      .then((data) =>
        res.status(200).json({
          success: true,
          message: "Tạo mới danh mục thành công !",
          data: data,
        })
      )
      .catch((err) => {
        res.status(400).json(`Lỗi: ${err}`);
      });
  }
  // updateCate(req, res, next) {
  //   const id = req.params.id;
  //   const { categoryName } = req.body;

  //   if (!categoryName) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Phải nhập tên danh mục!",
  //     });
  //   }

  //   Category.findById(id)
  //     .then((category) => {
  //       if (!category) {
  //         res.json("Danh mục không tồn tại!");
  //       }
  //       // Update the category object with the new data
  //       category.categoryName = categoryName;
  //       // Update the slug field based on the new categoryName value
  //       category.slug = slugify(categoryName, { lower: true });

  //       return category.save();
  //     })
  //     .then(() => {
  //       res.status(200).json({
  //         success: true,
  //         message: "Cập nhật danh mục thành công!",
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(400).json({
  //         success: false,
  //         message: err.message || "Thất bại!",
  //       });
  //     });
  // }

  // deleteCate(req, res, next) {
  //   const id = req.params.id;
  //   Category.deleteOne({ _id: id })
  //     .then(() => {
  //       res.status(200).json({
  //         success: true,
  //         message: "Xoá danh mục thành công",
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(400).json({
  //         success: false,
  //         message: `Lỗi : ${err}`,
  //       });
  //     });
  // }

  // getCateAll(req, res, next) {
  //   Category.find({})
  //     .then((data) => {
  //       res.status(200).json({
  //         success: true,
  //         message: "Thành công",
  //         data: data,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(400).json({
  //         success: false,
  //         message: `Lỗi : ${err}`,
  //       });
  //     });
  // }
  // getCateById(req, res, next) {
  //   const id = req.params.id;
  //   Category.findById(id)
  //     .then((data) => {
  //       res.status(200).json({
  //         success: true,
  //         message: "Thành công",
  //         data: data,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(400).json({
  //         success: false,
  //         message: `Lỗi : ${err}`,
  //       });
  //     });
  // }
}
module.exports = new ProductController();
