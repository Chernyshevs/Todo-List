import "./TaskCard.css";

import { useState } from "react";

import { editTask, deleteTask } from "../../api/https";

import TodoStatusSwitching from "../TodoStatusSwitching";
import IconButton from "../IconButton";
// import EditTask from "../EditTask";
import сancelIcon from "../../assets/cancelButton.svg";
import submitIcon from "../../assets/submitButton.svg";
import editIcon from "../../assets/editButton.svg";
import deleteIcon from "../../assets/deleteButton.svg";
import { MIN_TAKS_LENGTH, MAX_TAKS_LENGTH } from "../../constants/todos";

export default function TaskCard({ id, title, isDone, fetchTasks }) {
  const [taskData, setTaskData] = useState({
    id: id,
    title: title,
    isDone: isDone,
  });

  const [isEdit, setIsEdit] = useState(false);
  function handleStartEdit() {
    setIsEdit(true);
  }
  function handleEndEdit() {
    setIsEdit(false);
  }

  function handleChange(changedTitle) {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        title: changedTitle.trim(),
      };
    });
  }

  async function handleToggleSubmit(event) {
    event.preventDefault();
    if (
      !(
        taskData.title.length >= MIN_TAKS_LENGTH &&
        taskData.title.length <= MAX_TAKS_LENGTH
      )
    ) {
      alert(
        "Название задачи должно содержать минимум 2 символа, максимум 64 символов"
      );
      return;
    }
    setIsEdit((isEdit) => !isEdit);
    try {
      await editTask(taskData.id, taskData.isDone, taskData.title);
      await fetchTasks();
    } catch (error) {
      alert(`Ошибка: ${error.message || "Не удалось обновить задачу"}`);
    }
  }

  async function handleToggleDelele() {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (error) {
      alert(`Ошибка: ${error.message || "Не удалось удалить задачу"}`);
    }
  }
  return (
    <div className={`task-card ${isDone && "completed"}`}>
      <article className="left-side">

        <TodoStatusSwitching task={taskData} fetchTasks={fetchTasks} />
        {!isEdit && <p>{title}</p>}
        {isEdit && (
          <form id={id} onSubmit={(event) => handleToggleSubmit(event)}>
            <input
              defaultValue={title}
              onChange={(event) => handleChange(event.target.value)}
            ></input>
          </form>
        )}
      </article>

      <article className="right-side">
        {isEdit && (
          <>
            <IconButton color="primary" type="submit">
              {submitIcon}
            </IconButton>
            <IconButton color="error" onClick={handleEndEdit}>
              {сancelIcon}
            </IconButton>
          </>
        )}
        {!isEdit && (
          <>
            <IconButton color="primary" onClick={handleStartEdit}>
              {editIcon}
            </IconButton>
            <IconButton color="error" onClick={handleToggleDelele}>
              {deleteIcon}
            </IconButton>
          </>
        )}
      </article>
    </div>
  );
}
