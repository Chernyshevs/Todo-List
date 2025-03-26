import { useState, useEffect, useCallback } from "react";

import AddTask from "../../Components/AddTask";
import TaskContainer from "../../Components/TaskContainer";
import TaskStatuses from "../../Components/TaskStatuses";
import { TodoInfo, Todo, TodoStatus } from "../../types/todoTypes";
import { getTasks } from "../../api/https";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const TodoListPage: React.FC = () => {
  const [selectedTasks, setSelectedTasks] = useState<TodoStatus>("all");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string }>();

  const [Tasks, setTasks] = useState<Todo[]>([
    { id: 0, title: "", created: "", isDone: false },
  ]);
  const [countTasks, setCountTasks] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  });
  const [numberTimer, setNumberTimer] = useState(1);

  useEffect(() => {
    // таймер пересоздаётся каждый раз когда обновляется numberTimer
    const id = setInterval(() => setNumberTimer((numberTimer + 1)), 5000);
    fetchTasks();
    return () => {
      clearInterval(id);
    };
  }, [selectedTasks, numberTimer]);
  const handleSelectTasks = useCallback(
    (selectedButton: TodoStatus) => {
      setSelectedTasks(selectedButton);
    },
    [selectedTasks, countTasks]
  );

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const tasks = await getTasks(selectedTasks);

      setTasks((prevTasks) => {
        const isSame =
          prevTasks.length === tasks.data.length &&
          prevTasks.every(
            (task, i) => JSON.stringify(task) === JSON.stringify(tasks.data[i])
          );

        return isSame ? prevTasks : tasks.data;
      });

      setCountTasks((prevCountTasks) => {
        const isSame =
          JSON.stringify(prevCountTasks) === JSON.stringify(tasks.info);
        return isSame ? prevCountTasks : tasks.info;
      });
    } catch (error: any) {
      setError({ message: error.message });
    } finally {
      setIsLoading(false);
    }
  }, [Tasks, selectedTasks]);
  if (error) {
    alert("Произошла ошибка. Попробуйте перезагрузить страницу!");
  }
  return (
    <>
      <header id="header-main">
        <h1>Список задач</h1>
      </header>
      <main>
        {!error && (
          <div id="todo-list-board">
            <AddTask fetchTasks={fetchTasks} />
            <TaskStatuses
              onSelect={handleSelectTasks}
              selectedTasks={selectedTasks}
              countTasks={countTasks}
            />
            <TaskContainer fetchTasks={fetchTasks} Tasks={Tasks} />
            <Spin
              indicator={<LoadingOutlined spin />}
              size="small"
              style={!isLoading ? { opacity: `0` } : {}}
            />
          </div>
        )}
      </main>
    </>
  );
};
export default TodoListPage;
