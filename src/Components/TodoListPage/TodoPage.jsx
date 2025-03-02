import { useState } from "react";

import AddTask from "../AddTask/AddTask.jsx";
import TaskContainer from "../TaskContainer/TaskContainer.jsx";
import TaskStatuses from "../TaskStatuses/TaskStatuses.jsx";

import { taskCounterByStatus } from "../../api/https.js";
import { viewTasks } from "../../api/https.js";

export default function TodoListPage() {
  const [selectedTasks, setSelectedTasks] = useState("all");

  const [shownTasks, setShownTasks] = useState([]);
  const [isFetchingTasks, setIsFetchingTasks] = useState(false);
  const [errorTasks, setErrorTasks] = useState();

  const [isFetchingCountTasks, setIsFetchingCountTasks] = useState(false);
  const [countTasks, setCountTasks] = useState({});
  const [errorCountTasks, setErrorCountTasks] = useState();
  function handleSelectTasks(selectedButton) {
    setSelectedTasks(selectedButton);
  }

  async function fetchTasks() {
    try {
      setIsFetchingTasks(true);
      const tasks = await viewTasks(selectedTasks);
      setShownTasks(tasks);
      setIsFetchingTasks(false);
    } catch (error) {
      setErrorTasks({ message: error.message });
    }
  }

  async function fetchCountTasks() {
    try {
      setIsFetchingCountTasks(true);
      const count = await taskCounterByStatus();
      setCountTasks({
        all: count.all,
        inWork: count.inWork,
        completed: count.completed,
      });
      setIsFetchingCountTasks(false);
    } catch (error) {
      setErrorCountTasks(error);
    }
  }
  return (
    <>
      <header id="header-main">
        <h1>Список задач</h1>
      </header>
      <main>
        <div id="todo-list-board">
          <AddTask fetchTasks={fetchTasks} fetchCountTasks={fetchCountTasks} />
          <TaskStatuses
            onSelect={handleSelectTasks}
            selectedTasks={selectedTasks}
            fetchCountTasks={fetchCountTasks}
            isFetching={isFetchingCountTasks}
            countTasks={countTasks}
            error={errorCountTasks}
          />
          <TaskContainer
            selectedTasks={selectedTasks}
            fetchTasks={fetchTasks}
            shownTasks={shownTasks}
            isFetching={isFetchingTasks}
            error={errorTasks}
            fetchCountTasks={fetchCountTasks}
          />
        </div>
      </main>
    </>
  );
}
