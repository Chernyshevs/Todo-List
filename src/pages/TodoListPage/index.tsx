import { useState, useEffect } from "react";

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
    const id = setInterval(() => setNumberTimer(numberTimer + 1), 5000);
    fetchTasks();
    return () => {
      clearInterval(id);
    };
  }, [numberTimer]);

  useEffect(() => {
    fetchTasks();
  }, [selectedTasks]);
  const handleSelectTasks = (selectedButton: TodoStatus) => {
    setSelectedTasks(selectedButton);
  };

  const fetchTasks: () => Promise<void> = async () => {
    try {
      setIsLoading(true);
      const tasks = await getTasks(selectedTasks);
      setTasks(tasks.data);
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
