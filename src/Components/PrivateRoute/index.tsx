import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { checkAuth } from "../../store/auth-actions";

interface PrivateRouteProps {
  children: React.ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authStore = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  if (authStore.isAuth) {
    return children;
  } else {
    dispatch(checkAuth());
  }
};

export default PrivateRoute;
