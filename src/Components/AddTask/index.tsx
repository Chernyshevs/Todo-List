import "./AddTask.css";

import { useState } from "react";
import { addTask } from "../../api/https";

import { MIN_TAKS_LENGTH, MAX_TAKS_LENGTH } from "../../constants/todos";

export default function AddTask({ fetchTasks }) {
  const [newTask, setNewTask] = useState("");

  function handleChange(changedText) {
    setNewTask(changedText);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      !(newTask.length >= MIN_TAKS_LENGTH && newTask.length <= MAX_TAKS_LENGTH)
    ) {
      return;
    }
    try {
      await addTask(newTask);
      await fetchTasks();
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    } finally {
      setNewTask("");
    }
  }

  return (
    <section>
      <form id="add-task" onSubmit={handleSubmit}>
        <input
          required
          value={newTask}
          type="text"
          placeholder="Новая задача..."
          onChange={(event) => handleChange(event.target.value)}
        />
        <button>Добавить</button>
        {newTask && newTask.length < MIN_TAKS_LENGTH && (
          <p className="warning">
            Название задачи должно содержать минимум 2 символа
          </p>
        )}
        {newTask && newTask.length > MAX_TAKS_LENGTH && (
          <p className="warning">
            Название задачи должно содержать максимум 64 символа
          </p>
        )}
      </form>
    </section>
  );
}
