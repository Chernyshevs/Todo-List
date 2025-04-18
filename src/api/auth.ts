import {
  AuthData,
  RefreshToken,
  UserRegistration,
} from "../types/authTypes.js";
import { instance } from "./config.js";

export const login = (authData: AuthData) => {
  return instance.post("/auth/signin", authData);
};

export const register = (registerData: UserRegistration) => {
  return instance.post("/auth/signup", registerData);
};

export const refreshToken = (refreshToken: RefreshToken) => {
  return instance.post("/auth/refresh", refreshToken);
};

export const getUserData = async () => {
  try {
    const response = await instance.get("/user/profile");
    return response.data;
  } catch (error) {
    console.log("Ошибка при получении данных пользователя", error);
  }
};
