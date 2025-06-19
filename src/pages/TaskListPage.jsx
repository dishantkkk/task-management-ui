import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);

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

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Tasks</h1>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="bg-white p-6 rounded shadow">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <p className="text-gray-700 mt-2">{task.description}</p>
                <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TaskListPage;
