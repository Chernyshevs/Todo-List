import "./AddTask.css";

import { useState } from "react";
import { addTask } from "../../api/https";

import { MIN_TAKS_LENGTH, MAX_TAKS_LENGTH } from "../../constants/todos";

const AddTask: React.FC<{ fetchTasks: () => Promise<void> }> = ({
  fetchTasks,
}) => {
  const [newTask, setNewTask] = useState("");

  const handleChange = (changedText: string) => {
    setNewTask(changedText);
  };

  const handleToggleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (
      !(newTask.length >= MIN_TAKS_LENGTH && newTask.length <= MAX_TAKS_LENGTH)
    ) {
      return;
    }
    try {
      await addTask({title: newTask, isDone: false});
      await fetchTasks();
    } catch (error: any) {
      alert(`Ошибка: ${error.message}`);
    } finally {
      setNewTask("");
    }
  };

  return (
    <section>
      <form className="add-task" onSubmit={handleToggleSubmit}>
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
};
export default AddTask;
