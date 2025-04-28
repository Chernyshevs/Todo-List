import "./RootAppPage.css";

import { Outlet } from "react-router-dom";
import SidePanel from "../../Components/SidePanel";

import type { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../store/auth-actions";

const RootAppPage: React.FC = () => {
  const authStore = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();
  if (authStore.isAuth) {
    return (
      <div className="wrapper">
        <SidePanel />
        <Outlet />
      </div>
    );
  } else {
    console.log(123)
    dispatch(checkAuth());
  }
};

export default RootAppPage;
