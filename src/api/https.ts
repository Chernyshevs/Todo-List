const API_URL = "https://easydev.club/api/v1";
const ERROR_TEXT = "Произошла ошибка, попробуйте обновить страницу.";

export interface TodoRequest {
  title?: string;
  isDone?: boolean; // изменение статуса задачи происходит через этот флаг
}

// или так type TodoRequest = Partial<Omit<Todo, "id" | "created">>;

export interface Todo {
  id: number;
  title: string;
  created: string; // ISO date string
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export const viewTasks = async (tasksStatus: string) => {
  try {
    const response = await fetch(`${API_URL}/todos?filter=${tasksStatus}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(ERROR_TEXT);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении задач:", error);
    throw error;
  }
};

export const editTask = async (id: number, changedData: TodoRequest) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(changedData),
    });
    if (!response.ok) {
      throw new Error(ERROR_TEXT);
    }
  } catch (error) {
    console.error("Ошибка при редактировании задачи:", error);
    throw error;
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(ERROR_TEXT);
    }
  } catch (error) {
    console.error("Ошибка при удалении задачи:", error);
    throw error;
  }
};

export const addTask = async (todoData: TodoRequest) => {
  try {
    const response = await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      throw new Error(ERROR_TEXT);
    }
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
    throw error;
  }
};

export const getTask = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(ERROR_TEXT);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении задачи:", error);
    throw error;
  }
}