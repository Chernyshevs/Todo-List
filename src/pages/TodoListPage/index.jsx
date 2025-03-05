import { useState, useEffect } from "react";

import AddTask from "../../Components/AddTask";
import TaskContainer from "../../Components/TaskContainer";
import TaskStatuses from "../../Components/TaskStatuses";

import { viewTasks } from "../../api/https.js";

export default function TodoListPage() {
  const [selectedTasks, setSelectedTasks] = useState("all");

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const [shownTasks, setShownTasks] = useState([]);
  const [countTasks, setCountTasks] = useState({});

  useEffect(() => {
    fetchTasks();
  }, [selectedTasks]);

  function handleSelectTasks(selectedButton) {
    setSelectedTasks(selectedButton);
  }

  async function fetchTasks() {
    try {
      setIsFetching(true);
      const tasks = await viewTasks(selectedTasks);
      setShownTasks(tasks.data);
      setCountTasks(tasks.info);
    } catch (error) {
      setError({ message: error.message });
    } finally {
      setIsFetching(false);
    }
  }

  if (error) {
    alert("Произошла ошибка. Попробуйте перезагрузить страницу!");
  }

  return (
    <>
      <header id="header-main">
        <h1>Список задач</h1>
      </header>
      <main>
        {!isFetching && !error && (
          <div id="todo-list-board">
            <AddTask fetchTasks={fetchTasks} />
            <TaskStatuses
              onSelect={handleSelectTasks}
              selectedTasks={selectedTasks}
              countTasks={countTasks}
            />
            <TaskContainer
              selectedTasks={selectedTasks}
              fetchTasks={fetchTasks}
              shownTasks={shownTasks}
            />
          </div>
        )}
      </main>
    </>
  );
}
