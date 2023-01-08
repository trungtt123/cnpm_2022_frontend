import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import privilegeReducer from "./privilegeSlice";
import detailroomSlice from "./detailRoomSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    privilege: privilegeReducer,
    isDetailVisible: detailroomSlice.reducer
  },
});
