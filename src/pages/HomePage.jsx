import { Link } from "react-router-dom";

const HomePage = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "Guest";
  const isLoggedIn = !!token;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 sm:p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome, {username} 👋
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Manage your tasks, stay organized, and boost your productivity — all in one place.
        </p>

        {!isLoggedIn && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg transition shadow"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg transition shadow"
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
