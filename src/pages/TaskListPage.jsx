import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        
      });
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
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border p-4 rounded shadow bg-white"
              >
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default TaskListPage;
