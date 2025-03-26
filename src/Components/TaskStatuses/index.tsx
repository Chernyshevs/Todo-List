import "./TaskStatuses.css";
import { TodoInfo, TodoStatus } from "../../types/todoTypes";
import { Menu } from "antd";
import { MenuProps } from "antd";
import { MenuStatuses } from "../../types/todoTypes";
import { memo } from "react";

const TaskStatuses: React.FC<{
  onSelect: (selectedButton: TodoStatus) => void;
  selectedTasks: TodoStatus;
  countTasks: TodoInfo;
}> = memo (({ onSelect, selectedTasks, countTasks }) => {
  const items: MenuStatuses[] = [
    {
      label: `Все(${countTasks.all})`,
      key: "all",
    },

    {
      label: `В работе(${countTasks.inWork})`,
      key: "inWork",
    },
    {
      label: `Сделано(${countTasks.completed})`,
      key: "completed",
    },
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    onSelect(e.key as TodoStatus);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[selectedTasks]}
      mode="horizontal"
      items={items}
      style={{ backgroundColor: "inherit", justifyContent: "center" }}
    />
  );
});
export default TaskStatuses;
