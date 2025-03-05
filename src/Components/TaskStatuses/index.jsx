import "./TaskStatuses.css";

export default function TaskStatuses({ onSelect, selectedTasks, countTasks }) {
  return (
    <menu id="task-statuses">
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
}
