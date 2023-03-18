import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUser: null,
      isFetching: false,
      error: false,
    },
    message: "",
  },
  reducers: {
    getUserStart: (state) => {
      state.users.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUser = action.payload;
      state.users.error = false;
    },
    getUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    delteUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.message = action.payload;
    },
    deleteUserFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.message = action.payload;
    },
  },
});

export const {
  getUserFailed,
  getUserStart,
  getUserSuccess,
  deleteUserStart,
  deleteUserFailed,
  delteUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
