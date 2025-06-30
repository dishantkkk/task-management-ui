import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { token, logout, role } = useAuth(); // ✅ added role
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="h-16 fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Task Manager
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleDarkMode(!darkMode)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>

          <div className="hidden md:flex items-center gap-4 text-sm font-medium">
            {token ? (
              <>
                {role === "ADMIN" && (
                  <>
                    <Link to="/admin" className="hover:text-blue-500">Admin Dashboard</Link>
                    <Link to="/admin/users" className="hover:text-blue-500">Users</Link>
                    <Link to="/admin/tasks" className="hover:text-blue-500">Tasks</Link>
                  </>
                )}
                <Link to="/dashboard" className="hover:text-blue-500">Dashboard</Link>
                <Link to="/tasks" className="hover:text-blue-500">Tasks</Link>
                <Link to="/add-task" className="hover:text-blue-500">Add Task</Link>
                <Link to="/profile" className="hover:text-blue-500">Profile</Link>
                <button onClick={handleLogout} className="text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-500">Login</Link>
                <Link to="/register" className="hover:text-blue-500">Register</Link>
              </>
            )}
          </div>

          <button className="md:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium">
          {token ? (
            <>
              {role === "ADMIN" && (
                <>
                  <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
                  <Link to="/admin/users" onClick={() => setMenuOpen(false)}>Users</Link>
                  <Link to="/admin/tasks" onClick={() => setMenuOpen(false)}>Tasks</Link>
                </>
              )}
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/tasks" onClick={() => setMenuOpen(false)}>Tasks</Link>
              <Link to="/add-task" onClick={() => setMenuOpen(false)}>Add Task</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button onClick={handleLogout} className="text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
