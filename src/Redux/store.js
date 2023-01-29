import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import privilegeReducer from "./privilegeSlice";
import tabernacleReducer from "./tabernacleSlice";
import absentReducer from "./absentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    privilege: privilegeReducer,
    tabernacle: tabernacleReducer,
    absent: absentReducer,
  },
});
