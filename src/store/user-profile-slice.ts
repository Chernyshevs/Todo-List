import { createSlice } from "@reduxjs/toolkit";
import { Roles, User } from "../types/adminTypes";
import { RootState } from ".";

const initialUserProfileState: { userData: User } = {
  userData: {
    id: 0,
    username: "",
    email: "",
    date: "",
    isBlocked: false,
    roles: [],
    phoneNumber: "",
  },
};

export const hasRole = (role: Roles) => (state: RootState) =>
  state.userProfile.userData.roles.includes(role);

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
