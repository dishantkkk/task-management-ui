import { Link } from "react-router-dom";

const TaskCard = ({ task, onFlag, onView, isDueSoon }) => {
  return (
    <div
      className={`bg-white p-6 rounded shadow relative ${
        isDueSoon(task.dueDate, 24)
          ? "border-l-4 border-red-500"
          : isDueSoon(task.dueDate, 72)
          ? "border-l-4 border-yellow-400"
          : ""
      }`}
    >
      <h3 className="text-xl font-semibold flex justify-between items-center">
        {task.title}
        <button
          onClick={() => onFlag(task)}
          className={`px-2 py-1 rounded text-sm ${
            task.flag === "Flagged"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-black"
          }`}
        >
          {task.flag === "Flagged" ? "Unflag" : "Flag"}
        </button>
      </h3>

      <p className="text-sm text-gray-500">
        Due: {new Date(task.dueDate).toLocaleString()}
      </p>
      <p className="text-sm text-gray-500">
        Assigned To: {task.assignedToUsername || "You"}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        <span
          className={`text-xs font-bold px-2 py-1 rounded ${
            task.priority === "URGENT"
              ? "bg-red-200 text-red-800"
              : task.priority === "HIGH"
              ? "bg-orange-200 text-orange-800"
              : task.priority === "MEDIUM"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {task.priority}
        </span>
        <span
          className={`text-xs font-bold px-2 py-1 rounded ${
            task.status === "COMPLETED"
              ? "bg-green-200 text-green-800"
              : task.status === "IN_PROGRESS"
              ? "bg-blue-200 text-blue-800"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {task.status}
        </span>
      </div>

      <div className="mt-4 flex gap-4">
        <Link
          to={`/edit/${task.id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          Edit
        </Link>
        <button
          onClick={() => onView(task)}
          className="text-indigo-600 hover:underline text-sm"
        >
          View
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
