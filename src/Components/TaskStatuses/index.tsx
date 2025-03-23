import "./TaskStatuses.css";
import { TodoInfo, TodoStatus } from "../../types/todoTypes";

const TaskStatuses: React.FC<{
  onSelect: (selectedButton: TodoStatus) => void;
  selectedTasks: TodoStatus;
  countTasks: TodoInfo
}> = ({ onSelect, selectedTasks, countTasks }) => {
  return (
    <menu className="task-statuses">
      <li>
        <button
          onClick={() => onSelect("all")}
          className={selectedTasks === "all" ? "active" : ""}
        >
          Все ({countTasks.all})
        </button>
      </li>
      <li>
        <button
          onClick={() => onSelect("inWork")}
          className={selectedTasks === "inWork" ? "active" : ""}
        >
          В работе ({countTasks.inWork})
        </button>
      </li>
      <li>
        <button
          onClick={() => onSelect("completed")}
          className={selectedTasks === "completed" ? "active" : ""}
        >
          Сделано ({countTasks.completed})
        </button>
      </li>
    </menu>
  );
};
export default TaskStatuses;
