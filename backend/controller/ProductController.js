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
      !formData.category ||
      !formData.price
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
  updateProduct(req, res, next) {
    const id = req.params.id;
    const formData = req.body;
    if (
      !formData.title ||
      !formData.author ||
      !formData.desc ||
      !formData.year ||
      !formData.category ||
      !formData.price ||
      !formData.image
    ) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin!",
      });
    }

    Product.findById(id)
      .then((product) => {
        if (!product) {
          res.json("Sản phẩm không tồn tại!");
        }
        product.title = formData.title;
        product.slug = slugify(formData.title, { lower: true });

        return product.save();
      })
      .then((data) => {
        res.status(200).json({
          success: true,
          message: "Cập nhật danh mục thành công!",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: err.message || "Thất bại!",
        });
      });
  }

  deleteProduct(req, res, next) {
    const id = req.params.id;
    Product.deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({
          success: true,
          message: "Xoá sản phẩm thành công",
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: `Lỗi : ${err}`,
        });
      });
  }
  getProductByCategory(req, res, next) {
    const category = req.params.category;
    const litmit = req.query.limit ? parseInt(req.query.limit) : 10;
    Product.find({ category: category })
      .limit(litmit)
      .then((data) => {
        if (!data) {
          res.status(404).json({
            message: "Không tìm thấy sản phẩm",
          });
        } else {
          res.status(200).json({
            message: "Tìm thấy sản phẩm",
            data: data,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: "Lỗi",
        });
      });
  }
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
  getProduct(req, res, next) {
    const id = req.params.id;
    Product.findById(id)
      .then((data) => {
        res.status(200).json({
          success: true,
          message: "Thành công",
          data: data,
        });
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: `Lỗi : ${err}`,
        });
      });
  }

  getProductAll(req, res, next) {
    const litmit = req.query.limit ? parseInt(req.query.limit) : 15;
    Product.find()
      .limit(litmit)
      .then((data) => {
        res.status(200).json({
          success: true,
          message: "Thành công",
          products: data,
        });
      })
      .catch((err) => {
        res.status(400).json(`Lỗi: ${err}`);
      });
  }
}
module.exports = new ProductController();
