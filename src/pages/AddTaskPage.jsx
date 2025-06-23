import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    status: "PENDING",
  });

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
      fetchUsers();
    }
  }, [userRole, token]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate + ":00",
        priority: task.priority,
        status: task.status,
        assignedToId: userRole === "ADMIN" && assignedTo ? assignedTo : undefined,
      };

      await api.post("/tasks", request);
      navigate("/tasks");
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded shadow space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-white">Create Task</h2>

        {userRole === "ADMIN" && (
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Assign To</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="">-- Select User --</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Title</label>
          <input
            name="title"
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Due Date</label>
          <input
            name="dueDate"
            type="datetime-local"
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTaskPage;
