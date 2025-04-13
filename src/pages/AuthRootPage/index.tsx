import "./AuthRootPage.css";

import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import illustationAuth from "../../assets/illustrationAuth.png";
import { useSelector } from "react-redux";

import type { RootState } from "../../store";

const AuthRootPage: React.FC = () => {
  const authStore = useSelector((state: RootState) => state.auth);

  if (!authStore.isAuth) {
    return (
      <>
        <div className="auth-wrapper">
          <img
            src={illustationAuth}
            alt="Иллюстрация авторизации"
            className="auth-image"
          />

          <Outlet />
        </div>
      </>
    );
  } else {
    return <Navigate to="/todos" replace />;
  }
};

export default AuthRootPage;
