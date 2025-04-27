import "./SidePanel.css";

import { useEffect } from "react";

import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import {
  ProfileOutlined,
  UserOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { getUserData } from "../../api/auth";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

const SidePanel: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (
        userData.roles.includes("ADMIN") ||
        userData.roles.includes("MODERATOR")
      ) {
        setIsAdmin(true);
      }
    };
    fetchUserData();
  }, []);
  const items: MenuItem[] = [
    {
      key: "1",
      icon: <ProfileOutlined />,
      label: <Link to="/">Список задач</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="/profile">Профиль</Link>,
    },
  ];
  if (isAdmin) {
    items.push({
      key: "3",
      icon: <LaptopOutlined />,
      label: <Link to="/admin">Пользователи</Link>,
    });
  }

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
