import React, { useEffect, useState } from "react";

const TaskDrawer = ({ task, onClose, onDelete, onMarkComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (task) {
      // Trigger enter animation
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [task]);

  if (!task) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 500); // Match with duration
  };

  return (
    <>
      {/* Blurred Background */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={handleClose}
      />

      {/* Drawer with smooth transition */}
      <div
        className={`fixed right-0 top-0 h-full w-[500px] bg-white shadow-lg z-50 transform transition-transform duration-500 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 space-y-4 h-full flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>

          <p className="text-gray-700">{task.description}</p>

          <p className="text-sm text-gray-500">
            <strong>Due:</strong> {task.dueDate}
          </p>

          <p className="text-sm text-gray-500">
            <strong>Assigned To:</strong> {task.assignedToUsername || "You"}
          </p>

          <p className="text-sm">
            <strong>Priority:</strong>{" "}
            <span
              className={`font-bold px-2 py-1 rounded ${
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
          </p>

          <p className="text-sm">
            <strong>Status:</strong>{" "}
            <span
              className={`font-bold px-2 py-1 rounded ${
                task.status === "COMPLETED"
                  ? "bg-green-200 text-green-800"
                  : task.status === "IN_PROGRESS"
                  ? "bg-blue-200 text-blue-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {task.status}
            </span>
          </p>

          <div className="mt-auto flex justify-between gap-2">
            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Delete
            </button>

            {task.status !== "COMPLETED" && (
              <button
                onClick={() => onMarkComplete(task.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Mark Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDrawer;
