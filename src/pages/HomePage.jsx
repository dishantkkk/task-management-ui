import { Link } from "react-router-dom";

const HomePage = () => {
  const isLoggedIn = !!localStorage.getItem("token");
  const username = localStorage.getItem("username") || "Guest";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
          Welcome, {username}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
          A full-featured task management system to organize, prioritize, and complete your tasks with ease.
        </p>

        {isLoggedIn ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tasks"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg transition"
            >
              View Tasks
            </Link>
            <Link
              to="/add-task"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg transition"
            >
              Add New Task
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded text-lg transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
