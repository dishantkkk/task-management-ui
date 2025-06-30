import { useEffect, useState } from "react";
import api from "../services/api";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    api.get("/users/me").then((res) => {
      setProfile(res.data);
      setForm({ name: res.data.name, email: res.data.email });
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");
    try {
      await api.put("/user/update", form);
      setMessage("Profile updated successfully");
    } catch {
      setErrorMsg("Failed to update profile");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMsg("");
    if (passwordForm.newPassword.length < 6) {
      setErrorMsg("New password must be at least 6 characters");
      return;
    }
    try {
      await api.put("/user/update-password", passwordForm);
      setMessage("Password updated successfully");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setErrorMsg(err.response?.data || "Failed to update password");
    }
  };

  if (!profile) return <p className="text-center mt-8">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
      <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
        My Profile
      </h2>

      {message && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4">
          {message}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-sm font-medium dark:text-gray-300">Full Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border p-2 rounded dark:bg-gray-900 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium dark:text-gray-300">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border p-2 rounded dark:bg-gray-900 dark:text-white"
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Username: <strong>{profile.username}</strong> | Role: <strong>{profile.role}</strong>
        </p>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Update Profile
        </button>
      </form>

      <hr className="my-6" />

      <form onSubmit={handlePasswordUpdate}>
        <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200 mb-4">
          Change Password
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium dark:text-gray-300">
            Current Password
          </label>
          <input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
            }
            className="w-full border p-2 rounded dark:bg-gray-900 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium dark:text-gray-300">
            New Password
          </label>
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm({ ...passwordForm, newPassword: e.target.value })
            }
            className="w-full border p-2 rounded dark:bg-gray-900 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
