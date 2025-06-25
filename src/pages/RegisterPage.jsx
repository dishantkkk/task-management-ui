import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: "Weak", color: "bg-red-500", width: "w-1/3" };
    if (score <= 3) return { label: "Medium", color: "bg-yellow-500", width: "w-2/3" };
    return { label: "Strong", color: "bg-green-500", width: "w-full" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const trimmedForm = {
      ...form,
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
    };

    if (trimmedForm.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (trimmedForm.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return;
    }

    try {
      await api.post("/auth/register", trimmedForm);
      setSuccessMsg("Registration successful! Please check your email to verify your account.");
      // navigate("/login");
      setForm({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Registration failed", err);
      const message =
        err.response?.data || "Registration failed. Please try again.";
      setErrorMsg(typeof message === "string" ? message : "Unknown error");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 dark:from-gray-800 dark:to-gray-900 px-4">
      {successMsg && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm dark:bg-green-200">
          {successMsg}
          <div className="mt-2 text-center">
            <Link
              to="/login"
              className="text-purple-600 font-medium underline hover:text-purple-800"
            >
              Go to Login
            </Link>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-600 dark:text-purple-400">
          Create an Account
        </h2>

        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm dark:bg-red-200">
            {errorMsg}
          </div>
        )}

        {/* Name */}
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Username */}
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Email */}
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Password */}
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* Password strength meter */}
        {form.password && (
          <div className="mb-4">
            <div className="h-2 rounded-full bg-gray-300 dark:bg-gray-700 overflow-hidden">
              <div
                className={`h-full transition-all ${getPasswordStrength(form.password).color} ${getPasswordStrength(form.password).width}`}
              ></div>
            </div>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              Strength: {getPasswordStrength(form.password).label}
            </p>
          </div>
        )}

        {/* Confirm Password */}
        <label className="block text-sm font-medium mb-1 dark:text-gray-300">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl transition"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
