import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setError } = authSlice.actions;

export const authSelector = (state) => state.auth;

export default authSlice.reducer;
