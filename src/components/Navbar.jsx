import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="text-lg font-bold">
        <Link to="/tasks">Task Manager</Link>
      </div>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
        <Link to="/tasks" className="hover:underline">
          Tasks
        </Link>
        <Link to="/add-task" className="hover:underline">
          Add Task
        </Link>
        <button onClick={handleLogout} className="hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
