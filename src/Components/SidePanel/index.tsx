import "./SidePanel.css";

import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ProfileOutlined, UserOutlined } from "@ant-design/icons";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <ProfileOutlined />,
    label: <Link to={"/todos"}>Список задач</Link>,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: <Link to={"/profile"}>Профиль</Link>,
  },
];

const SidePanel: React.FC = () => {
  return (
    <aside className="side-nav-panel">
      <Menu
        style={{ width: 215, backgroundColor: "inherit" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </aside>
  );
};

export default SidePanel;
