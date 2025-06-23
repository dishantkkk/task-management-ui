import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

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
  const byStatus = (status) => tasks.filter(t => t.status === status).length;
  const byPriority = (priority) => tasks.filter(t => t.priority === priority).length;

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Task Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-100 p-4 rounded shadow">
            <h2 className="text-lg font-bold">Total Tasks</h2>
            <p className="text-2xl">{total}</p>
          </div>
          <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-lg font-bold">Completed</h2>
            <p className="text-2xl">{byStatus("COMPLETED")}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded shadow">
            <h2 className="text-lg font-bold">Pending</h2>
            <p className="text-2xl">{byStatus("PENDING")}</p>
          </div>
          <div className="bg-orange-100 p-4 rounded shadow">
            <h2 className="text-lg font-bold">In Progress</h2>
            <p className="text-2xl">{byStatus("IN_PROGRESS")}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["LOW", "MEDIUM", "HIGH", "URGENT"].map((priority) => (
            <div key={priority} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-sm font-semibold">{priority}</h3>
              <p className="text-xl">{byPriority(priority)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
