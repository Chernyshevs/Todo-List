import { UserFilters, UserRequest } from "../types/adminTypes";
import { instance } from "./config";

export const getAllUsers = async (userFilters: UserFilters) => {
  try {
    const response = await instance.get("/admin/users", {
      params: userFilters,
    });
    return response.data;
  } catch (error) {
    console.log("Ошибка при получении пользователей", error);
  }
};

export const getUser = async (id: String) => {
  try {
    const response = await instance.get(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.log("Ошибка при получении пользователя", error);
  }
};

export const updateUserData = async (id: string, userData: UserRequest) => {
  try {
    await instance.put(`/admin/users/${id}`, userData);
  } catch (error) {
    console.log("Не удалось обновить данные пользователя", error);
  }
};
