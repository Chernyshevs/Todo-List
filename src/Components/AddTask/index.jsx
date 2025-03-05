import "./AddTask.css";

import { useState } from "react";
import { addTask } from "../../api/https";

export default function AddTask({ fetchTasks }) {
  const [newTask, setNewTask] = useState("");

  function handleChange(changedText) {
    setNewTask(changedText);
  }

  async function handleSubmit(event) {
    await event.preventDefault();
    if (!(newTask.length >= 2 && newTask.length <= 64)) {
      return;
    }
    setNewTask("");
    try {
      await addTask(newTask);
      await fetchTasks();
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
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
        {newTask && newTask.length < 2 && (
          <p className="warning">
            Название задачи должно содержать минимум 2 символа
          </p>
        )}
        {newTask && newTask.length > 64 && (
          <p className="warning">
            Название задачи должно содержать максимум 64 символа
          </p>
        )}
      </form>
    </section>
  );
}
