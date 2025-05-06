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

import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <RootAppPage />
        </PrivateRoute>
      ),
      children: [
        { index: true, element: <Navigate to="/todos" replace /> },
        { path: "todos", element: <TodoListPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "admin", element: <AdminPage /> },
        { path: "admin/:userId", element: <UserPage /> },
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
