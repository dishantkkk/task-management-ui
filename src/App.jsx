import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import TaskListPage from "./pages/TaskListPage";
import AddTaskPage from "./pages/AddTaskPage";
import EditTaskPage from "./pages/EditTaskPage";
import PrivateRoute from "./routes/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage"

const App = () => {
  useEffect(() => {
    // Initialize dark mode from localStorage
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks" element={<PrivateRoute><TaskListPage /></PrivateRoute>}/>
          <Route path="/add-task" element={<PrivateRoute><AddTaskPage /></PrivateRoute>}/>
          <Route path="/edit/:id" element={<PrivateRoute><EditTaskPage /></PrivateRoute>}/>
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>}/>
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
