import { Navigate, Outlet } from "react-router-dom";
import SidePanel from "../../Components/SidePanel";
const isAuth = false;
const RootAppPage: React.FC = () => {
  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <SidePanel />
      <Outlet />
    </>
  );
};

export default RootAppPage;
