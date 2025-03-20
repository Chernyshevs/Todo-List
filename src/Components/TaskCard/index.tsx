import "./TaskCard.css";

import { useState, useRef } from "react";

import { editTask, deleteTask, getTask } from "../../api/https";
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
  id: number;
  title: string;
  created: string;
  isDone: boolean;
  fetchTasks: () => Promise<void>;
}> = ({ id, title, created, isDone, fetchTasks }) => {
  const [taskData, setTaskData] = useState<Todo>({
    id: id,
    title: title,
    created: created,
    isDone: isDone,
  });
  const todoTextInputRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const handleStartEdit = async () => {
    try {
      const urgentTask = await getTask(id);
      setTaskData((prevTaskData) => {
        return {
          ...prevTaskData,
          title: urgentTask.title
        }
      })
    } catch {
      await fetchTasks();
      alert("Задачи не существует");
    } finally {
      setIsEdit(true);
    }
  };
  const handleEndEdit = () => {
    setIsEdit(false);
  };
  const handleToggleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = todoTextInputRef.current!.value;
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
    setIsEdit((isEdit) => !isEdit);
    try {
      await editTask(taskData.id, {
        title: enteredText.trim(),
        isDone: taskData.isDone,
      });
      await fetchTasks();
    } catch (error: any) {
      alert(`Ошибка: ${error.message || "Не удалось обновить задачу"}`);
    }
  };

  const handleToggleDelele = async () => {
    try {
      await deleteTask(id);
      await fetchTasks();
    } catch (error: any) {
      alert(`Ошибка: ${error.message || "Не удалось удалить задачу"}`);
    }
  };
  return (
    <div className={`task-card ${isDone && "completed"}`}>
      <article className="left-side">
        <TodoStatusSwitching task={taskData} fetchTasks={fetchTasks} />
        {!isEdit && <p>{taskData.title}</p>}
        {isEdit && (
          <form
            id={`task_${id}`}
            onSubmit={(event) => handleToggleSubmit(event)}
          >
            <input
              defaultValue={taskData.title}
              ref={todoTextInputRef}
            ></input>
          </form>
        )}
      </article>

      <article className="right-side">
        {isEdit && (
          <>
            <IconButton color="primary" type="submit" form={`task_${id}`}>
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
