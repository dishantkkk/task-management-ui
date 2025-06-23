import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (

    <nav className="bg-white dark:bg-gray-900 shadow text-gray-800 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Task Manager</Link>

        <div className="flex items-center gap-4">
          <button
            onClick={() => toggleDarkMode(!darkMode)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>

          <div className="hidden md:flex items-center gap-4">
            {token && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/add-task">Add Task</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout} className="text-red-500">Logout</button>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {token && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/tasks">Tasks</Link>
              <Link to="/add-task">Add Task</Link>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className="text-red-500">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
