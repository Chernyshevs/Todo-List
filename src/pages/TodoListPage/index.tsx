import { useState, useEffect } from "react";

import AddTask from "../../Components/AddTask";
import TaskContainer from "../../Components/TaskContainer";
import TaskStatuses from "../../Components/TaskStatuses";

import { TodoInfo, Todo } from "../../types/todoTypes";
import { viewTasks } from "../../api/https";

const TodoListPage: React.FC = () => {
  const [selectedTasks, setSelectedTasks] = useState("all");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ message: string }>();

  const [shownTasks, setShownTasks] = useState<Todo[]>();
  const [countTasks, setCountTasks] = useState<TodoInfo>();

  useEffect(() => {
    fetchTasks();
  }, [selectedTasks]);
  const handleSelectTasks = (selectedButton: string) => {
    setSelectedTasks(selectedButton);
  };

  const fetchTasks: () => Promise<void> = async () => {
    try {
      setIsLoading(true);
      const tasks = await viewTasks(selectedTasks);
      setShownTasks(tasks.data);
      setCountTasks(tasks.info);
    } catch (error: any) {
      setError({ message: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  if (error) {
    alert("Произошла ошибка. Попробуйте перезагрузить страницу!");
  }
  return (
    <>
      <header id="header-main">
        <h1>Список задач</h1>
      </header>
      <main>
        {isLoading && <p className="loading">Загрузка...</p>}
        {!isLoading && !error && (
          <div id="todo-list-board">
            <AddTask fetchTasks={fetchTasks} />
            <TaskStatuses
              onSelect={handleSelectTasks}
              selectedTasks={selectedTasks}
              countTasks={countTasks!}
            />
            <TaskContainer fetchTasks={fetchTasks} shownTasks={shownTasks!} />
          </div>
        )}
      </main>
    </>
  );
};
export default TodoListPage;
