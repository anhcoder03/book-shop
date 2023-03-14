const User = require("../models/User");
const mongoose = require("mongoose");

class UserController {
  register(req, res, next) {
    const formData = req.body;
    User.findOne({ username: formData.username })
      .then((data) => {
        if (data) {
          res.json("Tên đăng nhập đã tồn tại");
        } else {
          return User.create(formData);
        }
      })
      .then((data) => res.json("Tạo tài khoản thành công"))
      .catch((err) => {
        res.status(500).json("Loi cmnr");
      });
  }
  login(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("Missing username and/or password");
    }
    try {
      User.findOne({ username: username, password: password }).then((data) => {
        if (data) {
          res
            .status(200)
            .json({ success: true, message: "Đăng nhập thành công", data });
        } else {
          res.status(401).json({
            success: false,
            message: "Tài khoản hoặc mật khẩu không đúng",
          });
        }
      });
    } catch (err) {
      return res.status(403).json("Lỗi server");
    }
  }
  getUsers(req, res, next) {
    User.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        return res.status(403).json("Lỗi server");
      });
  }
  getUser(req, res, next) {
    const { username } = req.body;
    User.findOne({ username: username })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        return res.status(500).json("Lỗi server");
      });
  }

  updateUser(req, res, next) {
    const id = req.params.id;
    User.updateOne({ _id: id }, req.body)
      .then(() => {
        res.json("success");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteUser(req, res, next) {
    const id = req.params.id;
    User.deleteOne({ _id: id })
      .then(() => {
        res.json("xoá cmnr");
      })
      .catch((err) => {
        res.json(err);
      });
  }
}
module.exports = new UserController();
