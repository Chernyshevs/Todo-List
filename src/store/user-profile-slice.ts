import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/adminTypes";

const initialUserProfileState: { userData: User } = {
  userData: {
    id: 0,
    username: "",
    email: "",
    date: "",
    isBlocked: false,
    roles: ["USER"],
    phoneNumber: "",
  },
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialUserProfileState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const userProfileActions = userProfileSlice.actions;
export default userProfileSlice.reducer;
