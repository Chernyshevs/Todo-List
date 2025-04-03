import "./AuthRootPage.css";

import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import illustationAuth from "../../assets/illustrationAuth.png";

const isAuth = false;

const AuthRootPage: React.FC = () => {
  if (isAuth) {
    return <Navigate to="/todos" replace />;
  }

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
};

export default AuthRootPage;
