const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AuthController2 = {
  // register
  register: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // Create user
      const newUser = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        password: hashed,
        email: req.body.email,
      });

      // save to db
      const user = await newUser.save();
      res.status(200).json({
        messase: "Tạo tài khoản thành công",
        user: user,
      });
    } catch (err) {
      res.status(200).json(err);
    }
  },

  login: async (req, res) => {
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
          if (user && isMatch) {
            const accessToken = jwt.sign(
              {
                id: user._id,
                admin: user.admin,
              },
              process.env.ACCESS_KEY,
              { expiresIn: "30s" }
            );
            const { password, ...rest } = user._doc;
            return res.status(200).json({
              success: true,
              message: "Đăng nhập thành công!",
              ...rest,
              accessToken,
            });
          }
        });
      });
    } catch (err) {
      return res.status(400).json("Lỗi");
    }
  },

  getUsers(req, res, next) {
    User.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        return res.status(403).json("Lỗi server");
      });
  },
};

module.exports = AuthController2;
