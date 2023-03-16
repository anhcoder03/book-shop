const User = require("../models/User");
const bcrypt = require("bcryptjs");

class UserController {
  register(req, res, next) {
    const formData = req.body;
    User.findOne({ username: formData.username })
      .then((data) => {
        if (data) {
          res.json("Tên đăng nhập đã tồn tại");
        }
        return bcrypt.hash(formData.password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          fullname: formData.fullname,
          username: formData.username,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((user) =>
        res.status(201).json({
          message: "Tạo tài khoản thành công!",
          user: user,
        })
      )
      .catch((err) => {
        res.status(400).json("Loi cmnr");
      });
  }
  login(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json("Missing username and/or password");
    }
    try {
      User.findOne({ username: username }).then((user) => {
        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: "Username không tồn tại!" });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res
              .status(400)
              .json({ success: false, message: "Mật khẩu không đúng!" });
          }
          return res.status(200).json({
            success: true,
            message: "Đăng nhập thành công!",
            data: user,
          });
        });
      });
    } catch (err) {
      return res.status(400).json("Lỗi");
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
