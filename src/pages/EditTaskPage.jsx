import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    id: null,
    title: "",
    description: "",
    dueDate: "",
    priority: "MEDIUM",
    status: "PENDING",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        const dateTime = res.data.dueDate;
        const formattedDateTime = dateTime
          ? new Date(dateTime).toISOString().slice(0, 16)
          : "";
        setTask({
          id: res.data.id,
          title: res.data.title,
          description: res.data.description,
          dueDate: formattedDateTime,
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
    console.log("Changing:", e.target.name, e.target.value);
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
      };

      await api.put(`/tasks/${id}`, updateRequest);
      navigate("/tasks");
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600">Edit Task</h2>

          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            name="title"
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            name="dueDate"
            className="w-full border p-2 rounded"
            type="datetime-local"
            value={task.dueDate}
            onChange={handleChange}
            required
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm text-gray-800"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>

          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm text-gray-800"
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
    </>
  );
};

export default EditTaskPage;
