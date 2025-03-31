import { Outlet } from "react-router-dom";
import SidePanel from "../../Components/SidePanel";
const RootPage: React.FC = () => {
  return (
    <>
      <SidePanel />
      <Outlet />
    </>
  );
};

export default RootPage;
