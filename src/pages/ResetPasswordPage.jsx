import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const res = await api.post("/auth/reset-password", {
        token,
        password,
      });

      setMessage(res.data || "Password reset successful. Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New password"
            className="w-full p-2 mb-3 rounded border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full p-2 mb-4 rounded border"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Reset Password
          </button>
        </form>
        {message && <p className="mt-4 text-green-600 text-center text-sm">{message}</p>}
        {error && <p className="mt-4 text-red-500 text-center text-sm">{error}</p>}
      </div>
    </div>
  );
}
