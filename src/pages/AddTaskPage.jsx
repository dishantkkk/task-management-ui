import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const AddTaskPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");
  const userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (userRole === "ADMIN") {
      const fetchUsers = async () => {
        try {
          const res = await api.get("/users", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setUsers(res.data);
        } catch (err) {
          console.error("Failed to fetch users", err);
        }
      };

      fetchUsers(); // call the async function
    }
  }, [userRole, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title,
        description,
        dueDate,
        priority,
        assignedToId: userRole === "ADMIN" && assignedTo ? assignedTo : undefined,
      };
      await api.post("/tasks", payload);
      navigate("/tasks");
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 px-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <h2 className="text-2xl font-bold text-center text-blue-600">Add New Task</h2>

          {userRole === "ADMIN" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full border border-gray-300 rounded px-2 py-1"
              >
                <option value="">-- Select User --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.username}</option>
                ))}
              </select>
            </div>
          )}


          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            className="w-full border p-2 rounded"
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded px-3 py-2 text-sm text-gray-800"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};

export default AddTaskPage;
