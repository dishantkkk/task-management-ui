import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const toggleFlag = async (task) => {
    try {
      const payload = {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        type: "flag",
        value: task.flagged ? "false" : "true",
        priority: task.priority || "MEDIUM",
        status: task.status || "PENDING",
      };

      await api.put(`/tasks/${task.id}`, payload);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, flagged: !task.flagged } : t
        )
      );
    } catch (err) {
      console.error("Error toggling flag", err);
    }
  };

  const toggleView = (id) => {
    setExpandedTaskId((prev) => (prev === id ? null : id));
  };

  const isDueSoon = (dueDate, hours) => {
    const now = new Date();
    const due = new Date(dueDate);
    return due - now <= hours * 3600 * 1000 && due > now;
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter((task) =>
      priorityFilter === "ALL" ? true : task.priority === priorityFilter
    )
    .filter((task) =>
      statusFilter === "ALL" ? true : task.status === statusFilter
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.dueDate) - new Date(b.dueDate)
        : new Date(b.dueDate) - new Date(a.dueDate)
    );

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Tasks</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by title"
            className="border p-2 rounded flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="ALL">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="asc">Due Date ↑</option>
            <option value="desc">Due Date ↓</option>
          </select>
        </div>

        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white p-6 rounded shadow relative ${
                  isDueSoon(task.dueDate, 24)
                    ? "border-l-4 border-red-500"
                    : isDueSoon(task.dueDate, 72)
                    ? "border-l-4 border-yellow-400"
                    : ""
                }`}
              >
                <h3 className="text-xl font-semibold flex justify-between items-center">
                  {task.title}
                  <button
                    onClick={() => toggleFlag(task)}
                    className={`px-2 py-1 rounded text-sm ${
                      task.flagged
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {task.flagged ? "Unflag" : "Flag"}
                  </button>
                </h3>

                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded ${
                    task.priority === "URGENT"
                      ? "bg-red-200 text-red-800"
                      : task.priority === "HIGH"
                      ? "bg-orange-200 text-orange-800"
                      : task.priority === "MEDIUM"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {task.priority}
                </span>

                <div className="mt-4 flex gap-4">
                  <Link
                    to={`/edit/${task.id}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => toggleView(task.id)}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    {expandedTaskId === task.id ? "Hide" : "View"}
                  </button>
                </div>

                {expandedTaskId === task.id && (
                  <div className="mt-4 border-t pt-4 text-sm text-gray-800">
                    <p>{task.description}</p>
                    <div className="mt-4 flex gap-4">
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskListPage;
