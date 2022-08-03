import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./Slices/TaskSlice";
import authReducer from "./Slices/authSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});
