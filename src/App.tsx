import "@ant-design/v5-patch-for-react-19";
import TodoListPage from "./pages/TodoListPage";
import AuthPage from "./pages/AuthPage";
import RootPage from "./pages/RootPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      { path: "/", element: <TodoListPage /> },
      { path: "/profile", element: <AuthPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
