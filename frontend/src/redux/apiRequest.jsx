import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  delteUserSuccess,
  getUserFailed,
  getUserStart,
  getUserSuccess,
} from "./userSlice";

export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8080/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post("http://localhost:8080/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/sign-in");
  } catch (err) {
    dispatch(logoutFailed());
  }
};

export const getUserAll = async (accessToken, dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("http://localhost:8080/getUsers", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete(`http://localhost:8080/deleteUser/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(delteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed(err.response.data));
  }
};
