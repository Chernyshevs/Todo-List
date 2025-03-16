import emptyMark from "../../assets/empty-mark.png";
import checkMark from "../../assets/check-mark.png";
import { editTask } from "../../api/https";

export default function TodoStatusSwitching({ task, fetchTasks }) {
  async function handleToggleCheckBox(statusMark) {
    try {
      await editTask(task.id, !statusMark, task.title);
      await fetchTasks();
    } catch (error) {
      alert(`Ошибка: ${error.message || "Не удалось обновить задачу"}`);
    }
  }

  return (
    <>
      <input
        type="checkbox"
        value={task.isDone}
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
      />
      <img
        src={task.isDone ? checkMark : emptyMark}
        alt=""
        className="mark"
        onClick={() => handleToggleCheckBox(task.isDone)}
      />
    </>
  );
}
