import "./TaskCard.css";

import { useState } from "react";

import { editTask, deleteTask } from "../../api/https";
import { Todo } from "../../types/todoTypes";

import TodoStatusSwitching from "../TodoStatusSwitching";
import IconButton from "../IconButton";
// import EditTask from "../EditTask";
import сancelIcon from "../../assets/cancelButton.svg";
import submitIcon from "../../assets/submitButton.svg";
import editIcon from "../../assets/editButton.svg";
import deleteIcon from "../../assets/deleteButton.svg";
import { MIN_TAKS_LENGTH, MAX_TAKS_LENGTH } from "../../constants/todos";

const TaskCard: React.FC<{
  todo: Todo;
  fetchTasks: () => Promise<void>;
}> = ({ todo, fetchTasks }) => {
  const [taskData, setTaskData] = useState<Todo>(todo);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const handleStartEdit = () => {
    setIsEdit(true);
  };
  const handleEndEdit = () => {
    setIsEdit(false);
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = taskData.title;
    if (
      !(
        enteredText.trim().length >= MIN_TAKS_LENGTH &&
        enteredText.trim().length <= MAX_TAKS_LENGTH
      )
    ) {
      alert(
        "Название задачи должно содержать минимум 2 символа, максимум 64 символов"
      );
      return;
    }
    try {
      await editTask(taskData.id, {
        title: enteredText.trim(),
        isDone: taskData.isDone,
      });
      await fetchTasks();
    } catch (error: any) {
      alert(`Ошибка: ${error.message || "Не удалось обновить задачу"}`);
    } finally {
      setIsEdit(false);
    }
  };

  const handleChange = (event: any) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        title: event.target.value,
      };
    });
  };

  const handleToggleDelele = async () => {
    try {
      await deleteTask(todo.id);
      await fetchTasks();
    } catch (error: any) {
      alert(`Ошибка: ${error.message || "Не удалось удалить задачу"}`);
    }
  };
  return (
    <div className={`task-card ${todo.isDone && "completed"}`}>
      <article className="left-side">
        <TodoStatusSwitching task={taskData} fetchTasks={fetchTasks} />
        {!isEdit && <p>{todo.title}</p>}
        {isEdit && (
          <form
            id={`task_${todo.id}`}
            onSubmit={handleSubmit}
          >
            <input
              defaultValue={todo.title}
              onChange={handleChange}
            ></input>
          </form>
        )}
      </article>

      <article className="right-side">
        {isEdit && (
          <>
            <IconButton color="primary" type="submit" form={`task_${todo.id}`}>
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
};
export default TaskCard;
