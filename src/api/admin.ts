import {
  UserFilters,
  UserRequest,
  UserRolesRequest,
} from "../types/adminTypes";
import { instance } from "./config";

export const getAllUsers = async (userFilters: UserFilters) => {
  try {
    const response = await instance.get("/admin/users", {
      params: userFilters,
    });
    return response.data;
  } catch (error) {
    console.log("Ошибка при получении пользователей", error);
    throw error;
  }
};

export const getUser = async (id: String) => {
  try {
    const response = await instance.get(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    console.log("Ошибка при получении пользователя", error);
    throw error;
  }
};

export const updateUserData = async (id: string, userData: UserRequest) => {
  try {
    await instance.put(`/admin/users/${id}`, userData);
  } catch (error) {
    console.log("Не удалось обновить данные пользователя", error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await instance.delete(`/admin/users/${id}`);
  } catch (error) {
    console.log("Не удалось удалить пользователя", error);
    throw error;
  }
};
export const blockUser = async (id: string) => {
  try {
    await instance.post(`/admin/users/${id}/block`);
  } catch (error) {
    console.log("Не удалось заблокировать пользователя", error);
    throw error;
  }
};
export const unBlockUser = async (id: string) => {
  try {
    await instance.post(`/admin/users/${id}/unblock`);
  } catch (error) {
    console.log("Не удалось разблокировать пользователя", error);
    throw error;
  }
};

export const updateRolesUser = async (
  id: string,
  newRoles: UserRolesRequest
) => {
  try {
    await instance.post(`/admin/users/${id}/rights`, newRoles);
  } catch (error) {
    console.log("Не удалось обновить поли пользователя", error);
    throw error;
  }
};
