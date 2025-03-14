import TaskCard from "../TaskCard";

export default function TaskContainer({ fetchTasks, shownTasks }) {
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
