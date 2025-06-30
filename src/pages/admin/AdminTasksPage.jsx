import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { format } from "date-fns";

export default function AdminTasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Tasks</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border rounded shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Title</th>
              <th className="p-2">Assigned To</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Status</th>
              <th className="p-2">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t dark:border-gray-600">
                <td className="p-2">{task.id}</td>
                <td className="p-2">{task.title}</td>
                <td className="p-2">{task.username}</td>
                <td className="p-2">{task.priority}</td>
                <td className="p-2">{task.status}</td>
                <td className="p-2">{format(new Date(task.dueDate), "dd MMM yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
