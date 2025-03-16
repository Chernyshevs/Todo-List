import { Todo } from "../../api/https";
import TaskCard from "../TaskCard";

const TaskContainer: React.FC<{
  fetchTasks: () => Promise<void>;
  shownTasks: Todo[];
}> = ({ fetchTasks, shownTasks }) => {
  return (
    <section id="task-container">
      {shownTasks.length === 0 && <p>Задач нет</p>}
      <ul>
        {shownTasks.map((task) => {
          return (
            <li key={task.id}>
              <TaskCard
                id={task.id}
                title={task.title}
                created={task.created}
                isDone={task.isDone}
                fetchTasks={fetchTasks}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default TaskContainer;
