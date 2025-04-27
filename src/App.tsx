import "@ant-design/v5-patch-for-react-19";
import TodoListPage from "./pages/TodoListPage";
import ProfilePage from "./pages/ProfilePage";
import RootAppPage from "./pages/RootAppPage";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthRootPage from "./pages/AuthRootPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

import { useDispatch } from "react-redux";
import { checkAuth } from "./store/auth-actions";

import { useEffect } from "react";

import type { AppDispatch } from "./store";
import AdminPage from "./pages/AdminPage/AdminPage";
import UserAdminProfilePage from "./pages/UserAdminProfilePage";

function App() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootAppPage />,
      children: [
        { index: true, element: <Navigate to="/todos" replace /> },
        { path: "todos", element: <TodoListPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "admin", element: <AdminPage /> },
        { path: "admin/:userId", element: <UserAdminProfilePage /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthRootPage />,
      children: [
        { index: true, element: <Navigate to="/auth/login" replace /> },
        { path: "login", element: <LoginPage /> },
        { path: "registration", element: <RegistrationPage /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
