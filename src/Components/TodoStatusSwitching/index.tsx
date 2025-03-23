import emptyMark from "../../assets/empty-mark.png";
import checkMark from "../../assets/check-mark.png";
import { editTask } from "../../api/https";
import { Todo } from "../../types/todoTypes";
const TodoStatusSwitching: React.FC<{
  task: Todo;
  fetchTasks: () => Promise<void>;
}> = ({ task, fetchTasks }) => {
  const handleToggleCheckBox = async () => {
    try {
      await editTask(task.id, {title: task.title, isDone: !task.isDone});
      await fetchTasks();
    } catch (error: any) {
      alert(`Ошибка: ${error.message || "Не удалось обновить задачу"}`);
    }
  }

  return (
    <>
      <input
        type="checkbox"
        defaultChecked={task.isDone}
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
      />
      <img
        src={task.isDone ? checkMark : emptyMark}
        alt=""
        className="mark"
        onClick={handleToggleCheckBox}
      />
    </>
  );
};
export default TodoStatusSwitching;
