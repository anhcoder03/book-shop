const Comment = require("../models/Comment");

class CommentController {
  addComment = (req, res) => {
    const { userId, productId } = req.body;
    Comment.findOne({ productId: productId, userId: userId })
      .then((data) => {
        if (data) {
          res.status(400).json({
            success: false,
            message: "Bạn đã đánh giá sản phẩm này rồi",
          });
        } else {
          return Comment.create(req.body);
        }
      })
      .then((data) =>
        res.status(200).json({
          success: true,
          message: "Thành công",
          data: data,
        })
      )
      .catch((err) => {
        res.status(403).json({
          message: "Lỗi:" + err,
          success: false,
        });
      });
  };
  getCommentAll = (req, res) => {
    const productId = req.params.productId;
    Comment.find({ productId: productId })
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            message: "Không có đánh giá nào cho sản phẩm này",
          });
        }
        return res.status(200).json({
          data: data,
          message: "Tìm thấy dữ liệu",
        });
      })
      .catch((err) => {
        res.status(403).json("Lỗi " + err);
      });
  };
}
module.exports = new CommentController();
