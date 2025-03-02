import React from "react";

const TaskStatus = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.is_completed);
  const notCompletedTasks = tasks.filter((task) => !task.is_completed);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Task Status</h2>
      <div className="flex justify-around items-center">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-lg font-semibold text-green-400">
              {completedTasks.length}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Completed</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-lg font-semibold text-red-400">
              {notCompletedTasks.length}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Not Completed</p>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
