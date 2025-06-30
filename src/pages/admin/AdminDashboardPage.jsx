import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import api from "../../services/api";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function AdminDashboardPage() {
  const [userStats, setUserStats] = useState({ total: 0, admins: 0, users: 0 });
  const [taskStats, setTaskStats] = useState([]);

  useEffect(() => {
    fetchUserStats();
    fetchTaskStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const res = await api.get("/users");
      const users = res.data;
      const adminCount = users.filter(u => u.role === "ADMIN").length;
      const userCount = users.length - adminCount;
      setUserStats({ total: users.length, admins: adminCount, users: userCount });
    } catch (err) {
      console.error("Failed to fetch user stats", err);
    }
  };

  const fetchTaskStats = async () => {
    try {
      const res = await api.get("/tasks");
      const tasks = res.data;

      const statusMap = tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      }, {});

      const formatted = Object.entries(statusMap).map(([status, count]) => ({
        name: status,
        value: count
      }));

      setTaskStats(formatted);
    } catch (err) {
      console.error("Failed to fetch task stats", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h4 className="text-lg font-semibold">Total Users</h4>
          <p className="text-2xl mt-2">{userStats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h4 className="text-lg font-semibold">Admins</h4>
          <p className="text-2xl mt-2">{userStats.admins}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h4 className="text-lg font-semibold">Regular Users</h4>
          <p className="text-2xl mt-2">{userStats.users}</p>
        </div>
      </div>

      {/* Task Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h4 className="text-lg font-semibold mb-4">Task Status Distribution</h4>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {taskStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
