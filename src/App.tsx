import "@ant-design/v5-patch-for-react-19";
import TodoListPage from "./pages/TodoListPage";
import AuthPage from "./pages/AuthPage";
import SidePanel from "./Components/SidePanel";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/todos" element={<TodoListPage />} />
          <Route path="/profile" element={<AuthPage />} />
        </Routes>
      <SidePanel />
    </>
  );
}

export default App;
