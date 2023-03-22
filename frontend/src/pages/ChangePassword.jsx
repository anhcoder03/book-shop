import React from "react";
import * as Yup from "yup";
function ChangePassword() {
  const schema = Yup.object({
    password: Yup.string()
      .required("Vui lòng nhập mật khẩu hiện tại")
      .min(8, "Mật khẩu hiện tại phải có ít nhất 6 ký tự"),
    newPassword: Yup.string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(8, "Mật khẩu mới phải có ít nhất 6 ký tự"),
    confirmNewPassword: Yup.string()
      .required("Vui lòng xác nhận mật khẩu mới")
      .oneOf(
        [Yup.ref("newPassword"), null],
        "Mật khẩu mới và xác nhận không khớp"
      ),
  });
  return <div></div>;
}

export default ChangePassword;
