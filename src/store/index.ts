import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import authReducer from "./auth-slice";
import userProfileReducer from "./user-profile-slice";

const store = configureStore({
  reducer: { auth: authReducer, userProfile: userProfileReducer },
});

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
