import { memo } from "react";
import { Todo } from "../../types/todoTypes";
import TaskCard from "../TaskCard";

const TaskContainer: React.FC<{
  fetchTasks: () => Promise<void>;
  Tasks: Todo[];
}> = memo(({ fetchTasks, Tasks }) => {
  return (
    <section id="task-container">
      {Tasks.length === 0 && <p>Задач нет</p>}
      <ul>
        {Tasks.map((task) => {
          return (
            <li key={task.id}>
              <TaskCard
                todo={{
                  id: task.id,
                  title: task.title,
                  created: task.created,
                  isDone: task.isDone,
                }}
                fetchTasks={fetchTasks}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
});
export default TaskContainer;
