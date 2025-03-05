import TaskCard from "../TaskCard";

import { useEffect } from "react";

export default function TaskContainer({
  selectedTasks,
  fetchTasks,
  shownTasks,
}) {



  return (
    <section id="task-container">
      <ul>
        {shownTasks.length > 0 &&
          shownTasks.map((task) => {
            return (
              <li key={task.id}>
                <TaskCard
                  id={task.id}
                  title={task.title}
                  isDone={task.isDone}
                  fetchTasks={fetchTasks}
                />
              </li>
            );
          })}
      </ul>
    </section>
  );
}
