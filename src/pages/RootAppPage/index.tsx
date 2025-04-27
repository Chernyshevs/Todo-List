import "./RootAppPage.css";

import { Navigate, Outlet } from "react-router-dom";
import SidePanel from "../../Components/SidePanel";

import type { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const RootAppPage: React.FC = () => {
  const authStore = useSelector((state: RootState) => state.auth);
  if (authStore.isAuthInProgress) {
    return <Spin indicator={<LoadingOutlined spin />} size="large" />;
  }
  if (authStore.isAuth) {
    return (
      <div className="wrapper">
        <SidePanel />
        <Outlet />
      </div>
    );
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default RootAppPage;
