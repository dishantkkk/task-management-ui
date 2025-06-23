import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskDrawer from "../components/TaskDrawer";
import TaskCard from "../components/TaskCard";
import TaskFilters from "../components/TaskFilters";
import api from "../services/api";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedTask, setSelectedTask] = useState(null);
  const [message, setMessage] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFlag = async (task) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, flag: task.flag === "Flagged" ? "Unflagged" : "Flagged" } : t
    );
    setTasks(updatedTasks);

    try {
      const payload = {
        ...task,
        type: "flag",
        value: task.flag === "Flagged" ? "Unflagged" : "Flagged",
      };
      await api.put(`/tasks/${task.id}`, payload);
      fetchTasks();
    } catch (err) {
      console.error("Error toggling flag", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setMessage("✅ Task deleted");
      fetchTasks();
      setSelectedTask(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  const handleMarkComplete = async (id) => {
    try {
      await api.put(`/tasks/${id}`, {
        ...selectedTask,
        type: "action",
        value: "COMPLETED",
        status: "COMPLETED",
      });
      setMessage("✅ Task marked complete");
      fetchTasks();
      setSelectedTask(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error marking complete", err);
    }
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

  return (
    <>
      {message && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
          {message}
        </div>
      )}
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Tasks</h1>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-black dark:text-white">
          <TaskFilters
            search={search}
            setSearch={setSearch}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-600">No tasks found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onFlag={handleFlag}
                  onView={setSelectedTask}
                  isDueSoon={isDueSoon}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <TaskDrawer
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onDelete={handleDelete}
        onMarkComplete={handleMarkComplete}
      />
    </>
  );
};

export default TaskListPage;
