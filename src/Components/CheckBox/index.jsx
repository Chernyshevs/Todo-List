import emptyMark from "../../assets/empty-mark.png";
import checkMark from "../../assets/check-mark.png";
import { editTask } from "../../api/https";

export default function CheckBox({ task, fetchTasks}) {
  async function handleClickEditMark(statusMark) {
    try {
      await editTask(task.id, !statusMark, task.title);
      await fetchTasks();
    } catch (error) {
      alert(`Ошибка: ${error.message || "Не удалось обновить задачу"}`);
    }
  }

  return (
    <img
      src={task.isDone ? checkMark : emptyMark}
      alt=""
      className="mark"
      onClick={() => handleClickEditMark(task.isDone)}
    />
  );
}
