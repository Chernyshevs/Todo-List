import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuth: false, isAuthInProgress: false };

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    authStart(state) {
      state.isAuthInProgress = true;
    },
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
    authEnd(state) {
      state.isAuthInProgress = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;