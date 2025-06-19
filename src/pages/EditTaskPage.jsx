import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: "", description: "", dueDate: "" });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error("Error fetching task", err);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${id}`, task);
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
          <input
            name="title"
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={task.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
            required
          />
          <input
            name="dueDate"
            className="w-full border p-2 rounded"
            type="date"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
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
