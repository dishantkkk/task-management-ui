import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    id: null,
    title: "",
    description: "",
    dueDate: "",
    flag: "",
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
              Authorization: `Bearer ${token}`,
            },
          });
          setUsers(res.data);
        } catch (err) {
          console.error("Failed to fetch users", err);
        }
      };
      fetchUsers();
    }
  }, [userRole, token]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        const formattedDateTime = res.data.dueDate
          ? new Date(res.data.dueDate).toISOString().slice(0, 16)
          : "";

        setTask({
          id: res.data.id,
          title: res.data.title,
          description: res.data.description,
          dueDate: formattedDateTime,
          flag: res.data.flag,
          priority: res.data.priority || "MEDIUM",
          status: res.data.status || "PENDING",
        });
      } catch (err) {
        console.error("Error fetching task", err);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateRequest = {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate + ":00",
        type: "action",
        value: task.status,
        priority: task.priority,
        status: task.status,
        assignedToId: userRole === "ADMIN" && assignedTo ? assignedTo : undefined,
      };

      await api.put(`/tasks/${id}`, updateRequest);
      navigate("/tasks");
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-6 rounded shadow space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400">
          Edit Task
        </h2>

        {userRole === "ADMIN" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Assign To
            </label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded px-2 py-1"
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        )}

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Title
        </label>
        <input
          name="title"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
          placeholder="Title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Description
        </label>
        <textarea
          name="description"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
          placeholder="Description"
          value={task.description}
          onChange={handleChange}
          required
        />

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Due Date
        </label>
        <input
          name="dueDate"
          className="w-full border p-2 rounded dark:bg-gray-800 dark:text-white dark:border-gray-700"
          type="datetime-local"
          value={task.dueDate}
          onChange={handleChange}
          required
        />

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Priority
        </label>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>

        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
          Status
        </label>
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm text-gray-800 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskPage;
