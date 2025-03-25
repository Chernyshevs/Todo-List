import axios from "axios";

import { TodoRequest } from "../types/todoTypes";

const Api = axios.create({
  baseURL: `https://easydev.club/api/v1`,
});

export const getTasks = async (tasksStatus: string) => {
  try {
    const response = await Api.get(`todos?filter=${tasksStatus}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error;
  }
};

export const editTask = async (id: number, changedData: TodoRequest) => {
  try {
    await Api.put(`todos/${id}`, changedData);
  } catch (error) {
    console.error("Ошибка при редактировании задачи:", error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    await Api.delete(`todos/${id}`);
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    throw error;
  }
};

export const addTask = async (todoData: TodoRequest) => {
  try {
    await Api.post("todos", todoData);
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
    throw error;
  }
};
