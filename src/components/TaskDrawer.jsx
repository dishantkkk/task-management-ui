import React, { useEffect, useState } from "react";

const TaskDrawer = ({ task, onClose, onDelete, onMarkComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (task) {
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
    }, 500);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={handleClose}
      />

      <div
        className={`fixed right-0 top-0 h-full w-[500px] bg-white dark:bg-gray-900 text-black dark:text-white shadow-lg z-50 transform transition-transform duration-500 ${isVisible ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 space-y-4 h-full flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{task.title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white text-xl"
            >
              &times;
            </button>
          </div>

          <p className="dark:text-gray-300">{task.description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Due:</strong> {new Date(task.dueDate).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Assigned To:</strong> {task.assignedToUsername || "You"}
          </p>

          <p className="text-sm">
            <strong>Priority:</strong>{" "}
            <span
              className={`font-bold px-2 py-1 rounded ${task.priority === "URGENT"
                  ? "bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200"
                  : task.priority === "HIGH"
                    ? "bg-orange-200 dark:bg-orange-700 text-orange-800 dark:text-orange-200"
                    : task.priority === "MEDIUM"
                      ? "bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200"
                      : "bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200"
                }`}
            >
              {task.priority}
            </span>
          </p>

          <p className="text-sm">
            <strong>Status:</strong>{" "}
            <span
              className={`font-bold px-2 py-1 rounded ${task.status === "COMPLETED"
                  ? "bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200"
                  : task.status === "IN_PROGRESS"
                    ? "bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
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
