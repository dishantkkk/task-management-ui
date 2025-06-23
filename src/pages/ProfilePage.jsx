import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      if (!username.trim()) {
        setMessage({ text: "Username is required", type: "error" });
        return;
      }

      const payload = { username };
      if (password.trim()) payload.password = password;

      await api.put("/auth/profile", payload);

      localStorage.setItem("username", username); // keep it in sync
      setPassword("");
      setMessage({ text: "✅ Profile updated successfully", type: "success" });
    } catch (err) {
      console.error("Update failed", err);
      setMessage({ text: "❌ Failed to update profile", type: "error" });
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">
          Update Profile
        </h2>

        {message.text && (
          <div
            className={`mb-4 px-4 py-2 rounded text-sm font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-800 dark:bg-green-200"
                : "bg-red-100 text-red-800 dark:bg-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700 dark:text-gray-300">
              New Password <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <input
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
