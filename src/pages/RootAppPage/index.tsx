import "./RootAppPage.css";

import { Outlet } from "react-router-dom";
import SidePanel from "../../Components/SidePanel";

import type { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserData } from "../../api/auth";
import { userProfileActions } from "../../store/user-profile-slice";

const RootAppPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      dispatch(userProfileActions.setUserData(userData));
    };
    fetchUserData();
  }, []);

  return (
    <div className="wrapper">
      <SidePanel />
      <Outlet />
    </div>
  );
};

export default RootAppPage;
