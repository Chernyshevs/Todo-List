import { instance } from "./config";
import { TodoRequest } from "../types/todoTypes";


export const getTasks = async (tasksStatus: string) => {
  try {
    const response = await instance.get(`/todos`, {
      params: {
        filter: tasksStatus
      }
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error;
  }
};

export const editTask = async (id: number, changedData: TodoRequest) => {
  try {
    await instance.put(`/todos/${id}`, changedData)
  } catch (error) {
    console.error("Ошибка при редактировании задачи:", error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    await instance.delete(`todos/${id}`);
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    throw error;
  }
};

export const addTask = async (todoData: TodoRequest) => {
  try {
    await instance.post("/todos", todoData);
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
    throw error;
  }
};
