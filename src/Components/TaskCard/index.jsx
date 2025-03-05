import "./TaskCard.css";

import { useState } from "react";

import { editTask } from "../../api/https";

import CheckBox from "../CheckBox";
import EditTask from "../EditTask";
import DeleteTask from "../DeleteTask";

export default function TaskCard({
  id,
  title,
  isDone,
  fetchTasks,
}) {
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

  async function handleEditSubmit() {
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

  return (
    <div className={`task-card ${isDone && "completed"}`}>
      <article className="left-side">
        <CheckBox
          task={taskData}
          fetchTasks={fetchTasks}
        />
        {!isEdit && <p>{title}</p>}
        {isEdit && (
          <textarea
            rows={5}
            defaultValue={title}
            onChange={(event) => handleChange(event.target.value)}
          ></textarea>
        )}
      </article>

      <article className="right-side">
        {
          <EditTask
            onSelectEdit={handleEditBtnClick}
            onSubmitEdit={handleEditSubmit}
            isEdit={isEdit}
          />
        }
        {!isEdit && (
          <DeleteTask
            task={taskData}
            fetchTasks={fetchTasks}
          />
        )}
      </article>
    </div>
  );
}
