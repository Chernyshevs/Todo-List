import { Checkbox } from "antd";
import type { CheckboxProps } from "antd";

import { editTask } from "../../api/todos";
import { Todo } from "../../types/todoTypes";
const TodoStatusSwitching: React.FC<{
  task: Todo;
  fetchTasks: () => Promise<void>;
}> = ({ task, fetchTasks }) => {
  const onChange: CheckboxProps["onChange"] = async (e) => {
    try {
      await editTask(task.id, { title: task.title, isDone: e.target.checked });
      await fetchTasks();
    } catch (error: any) {
      alert(`Ошибка: ${error.message || "Не удалось обновить задачу"}`);
    }
  };
  return (
    <>
      <Checkbox defaultChecked={task.isDone} onChange={onChange}></Checkbox>
    </>
  );
};
export default TodoStatusSwitching;
