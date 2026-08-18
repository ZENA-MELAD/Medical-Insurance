import { createSlice } from "@reduxjs/toolkit";
import { decryptData, encryptData } from "../../config/lib";

// import { __admin__, __user__ } from "./../../config/userAfterEncrypt";

const getUserInfoFromLocal = () => {
  if (sessionStorage.getItem("userInfo")) {
    return JSON.parse(
      decryptData(sessionStorage.getItem("userInfo"))
    );
  }

  return {
    role: "guest",
    token: null,
    name: null,
    id: null,
    email: null,
    phone: null,
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getUserInfoFromLocal(),
  reducers: {
    login: (state, action) => {
      sessionStorage.setItem(
        "userInfo",
        encryptData(JSON.stringify(action.payload))
      );

      state.role = action.payload.role;
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    logout: (state) => {
      sessionStorage.removeItem("userInfo");

      state.role = "guest";
      state.token = null;
      state.email = null;
      state.phone = null;
      state.name = null;
      state.id = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
