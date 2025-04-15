import { authActions } from "./auth-slice";
import { login, refreshToken } from "../api/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { tokenManager } from "../helpers/token-manager";

import type { AppDispatch } from ".";
import type { AuthData, Token } from "../types/authTypes";

export const loginUser = createAsyncThunk<
  Token, // Return type (what you return from the payloadCreator)
  AuthData, // Argument type (authData)
  {
    rejectValue: string; // Type of the value passed to rejectWithValue
  }
>("auth/login", async (authData, thunkAPI) => {
  try {
    const response = await login(authData);
    tokenManager.accessToken = response.data.accessToken;
    tokenManager.refreshToken = response.data.refreshToken;
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка авторизации");
  }
});

export const checkAuth = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.authStart());
    try {
      const prevRefreshToken = localStorage.getItem("refresh-token");
      if (!prevRefreshToken) {
        throw new Error("login error");
      }
      const response = await refreshToken({ refreshToken: prevRefreshToken });
      tokenManager.accessToken = response.data.accessToken;
      tokenManager.refreshToken = response.data.refreshToken;
      dispatch(authActions.login());
    } catch (error) {
      console.log("login error");
    } finally {
      dispatch(authActions.authEnd());
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(authActions.authStart());

    tokenManager.accessToken = "";
    tokenManager.refreshToken = "";
    dispatch(authActions.logout());
    dispatch(authActions.authEnd());
  };
};
