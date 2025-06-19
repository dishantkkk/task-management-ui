import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this task?");
    if (!confirm) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const toggleCompletion = async (task) => {
    try {
      const updated = { ...task, completed: !task.completed };
      await api.put(`/tasks/${task.id}`, updated);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, completed: updated.completed } : t
        )
      );
    } catch (err) {
      console.error("Error toggling completion", err);
    }
  };

  const toggleView = (id) => {
    setExpandedTaskId((prev) => (prev === id ? null : id));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Tasks</h1>
        <input
          type="text"
          placeholder="Search by title"
          className="w-full border p-2 mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-6 rounded shadow relative"
              >
                <h3 className="text-xl font-semibold flex justify-between items-center">
                  {task.title}
                  <button
                    onClick={() => toggleCompletion(task)}
                    className={`px-2 py-1 rounded text-sm ${
                      task.completed
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {task.completed ? "Unflag" : "Flag"}
                  </button>
                </h3>
                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>

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
                      <button
                        onClick={() => toggleCompletion(task)}
                        className={`${
                          task.completed
                            ? "bg-gray-500"
                            : "bg-green-500"
                        } text-white px-3 py-1 rounded`}
                      >
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
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
