import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ResendLink from "../components/ResendLink";

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMsg(location.state.message);
      window.history.replaceState({}, document.title); // clear after showing once
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const res = await api.post("/auth/login", {
        usernameOrEmail: identifier,
        password,
      });

      login(res.data.token, res.data.username, res.data.role);
      navigate("/tasks");
    } catch (err) {
      const msg = err.response?.data;
      if (msg === "Email not verified") {
        setErrorMsg("Please verify your email. Check inbox or resend link.");
      } else {
        console.error("Login failed", err);
        setErrorMsg("Invalid username or password");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-100 to-blue-300 dark:from-gray-800 dark:to-gray-900 px-4">
      <div className="flex w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 bg-blue-600 text-white p-8 hidden md:flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-center">Login to access your tasks and stay organized.</p>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
            Login to Your Account
          </h2>

          {/* Success Message */}
          {successMsg && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm dark:bg-green-200">
              {successMsg}
            </div>
          )}

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm dark:bg-red-200">
              {errorMsg}
            </div>
          )}

          {/* Resend Link */}
          {errorMsg === "Please verify your email. Check inbox or resend link." && (
            <ResendLink identifier={identifier} />
          )}

          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Username or Email
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username or email"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />

            <label className="block text-sm font-medium mb-1 dark:text-gray-300">
              Password
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
          <p className="text-sm mt-2 text-center">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
