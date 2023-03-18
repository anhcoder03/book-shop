import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from "./authSlice";

export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8080/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailed(error.response.data));
  }
};

export const logout = async (dispatch, navigate, accessToken) => {
  dispatch(logoutStart());
  try {
    const res = await axios.post("http://localhost:8080/logout", null, {
      headers: { token: `Bearer ${accessToken}` },
    });

    if (res.status === 200) {
      dispatch(logoutSuccess());
      navigate("/sign-in");
    } else {
      dispatch(logoutFailed());
    }
  } catch (err) {
    dispatch(logoutFailed());
  }
};

// export const getUserAll = async (accessToken, dispatch) => {
//   dispatch(getUserStart());
//   try {
//     const res = await axios.get("http://localhost:8080/getUsers", {
//       headers: {
//         token: `Bearer ${accessToken}`,
//       },
//     });
//     dispatch(getUserSuccess(res.data));
//   } catch (err) {
//     dispatch(getUserFailed());
//   }
// };

// export const deleteUser = async (accessToken, dispatch, id) => {
//   dispatch(deleteUserStart());
//   try {
//     const res = await axios.delete(`http://localhost:8080/deleteUser/${id}`, {
//       headers: { token: `Bearer ${accessToken}` },
//     });
//     dispatch(delteUserSuccess(res.data));
//   } catch (err) {
//     dispatch(deleteUserFailed(err.response.data));
//   }
// };
