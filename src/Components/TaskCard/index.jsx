import "./TaskCard.css";

import { useState } from "react";

import { editTask, deleteTask } from "../../api/https";

import TodoStatusSwitching from "../TodoStatusSwitching";
// import EditTask from "../EditTask";
import CancelButton from "../CancelButton";
import SubmitButton from "../SubmitButton";
import EditButton from "../EditButton";
import DeleteTaskButton from "../DeleteTaskButton";

export default function TaskCard({ id, title, isDone, fetchTasks }) {
  const [taskData, setTaskData] = useState({
    id: id,
    title: title,
    isDone: isDone,
  });

  const [isEdit, setIsEdit] = useState(false);
  function handleEditBtnClick() {
    setIsEdit((isEdit) => !isEdit);
  }

  function handleChange(changedTitle) {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        title: changedTitle,
      };
    });
  }

  async function handleEditSubmit(event) {
    event.preventDefault();
    if (!(taskData.title.length >= 2 && taskData.title.length <= 64)) {
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

  async function handleClickDelele() {
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
        <input
          type="checkbox"
          value={isDone}
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
        />
        <TodoStatusSwitching task={taskData} fetchTasks={fetchTasks} />
        {!isEdit && <p>{title}</p>}
        {isEdit && (
          <form id={id} onSubmit={(event) => handleEditSubmit(event)}>
            <textarea
              rows={5}
              defaultValue={title}
              onChange={(event) => handleChange(event.target.value)}
            ></textarea>
          </form>
        )}
      </article>

      <article className="right-side">
        {isEdit && (
          <>
            <SubmitButton type="submit" form={id} />
            <CancelButton onClick={handleEditBtnClick} />
          </>
        )}
        {!isEdit && (
          <>
            <EditButton onClick={handleEditBtnClick} />
            <DeleteTaskButton onClick={handleClickDelele} />
          </>
        )}
      </article>
    </div>
  );
}
