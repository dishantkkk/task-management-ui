import { useEffect, useState } from "react";
import api from "../services/api";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    };
    fetchTasks();
  }, []);

  const total = tasks.length;
  const byStatus = (status) => tasks.filter((t) => t.status === status).length;
  const byPriority = (priority) => tasks.filter((t) => t.priority === priority).length;

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Task Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded shadow">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Total Tasks</h2>
          <p className="text-2xl text-gray-900 dark:text-blue-200">{total}</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded shadow">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Completed</h2>
          <p className="text-2xl text-gray-900 dark:text-green-200">{byStatus("COMPLETED")}</p>
        </div>
        <div className="bg-yellow-100 dark:bg-yellow-900 p-4 rounded shadow">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">Pending</h2>
          <p className="text-2xl text-gray-900 dark:text-yellow-200">{byStatus("PENDING")}</p>
        </div>
        <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded shadow">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">In Progress</h2>
          <p className="text-2xl text-gray-900 dark:text-orange-200">{byStatus("IN_PROGRESS")}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["LOW", "MEDIUM", "HIGH", "URGENT"].map((priority) => (
          <div key={priority} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">{priority}</h3>
            <p className="text-xl text-gray-900 dark:text-white">{byPriority(priority)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
