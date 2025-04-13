import { Navigate, Outlet } from "react-router-dom";
import SidePanel from "../../Components/SidePanel";

import type { RootState } from "../../store";
import { useSelector } from "react-redux";

const RootAppPage: React.FC = () => {
  const authStore = useSelector((state: RootState) => state.auth);

  if (authStore.isAuthInProgress) {
    return <p>Проверка авторизации</p>;
  }

  if (authStore.isAuth) {
    return (
      <>
        <SidePanel />
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default RootAppPage;
