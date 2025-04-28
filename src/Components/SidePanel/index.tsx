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
import { useDispatch } from "react-redux";
import { userProfileActions } from "../../store/user-profile-slice";

type MenuItem = Required<MenuProps>["items"][number];

const SidePanel: React.FC = () => {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      dispatch(userProfileActions.setUserData(userData));
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

  const currentPath = window.location.pathname;

  return (
    <aside className="side-nav-panel">
      <Menu
        style={{ width: 215, backgroundColor: "inherit" }}
        defaultSelectedKeys={
          currentPath === "/" || currentPath === "/todos"
            ? ["1"]
            : currentPath === "/profile"
            ? ["2"]
            : currentPath === "/admin"
            ? ["3"]
            : undefined
        }
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </aside>
  );
};

export default SidePanel;
