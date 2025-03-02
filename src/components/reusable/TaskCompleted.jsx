import React from "react";

const TaskCompleted = ({tasks}) => {
  const completedTasks = tasks.filter((task) => task.is_completed);
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">Completed Tasks</h2>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <div key={task.task_id} className="flex items-start space-x-4 mb-4">
            <img
              src={
                task.task_image ||
                "https://cdn-icons-png.flaticon.com/512/4345/4345573.png"
              }
              alt={task.title}
              className="w-12 h-12 rounded-lg"
            />
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-500">{task.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Completed on {new Date(task.time_created).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No completed tasks yet.</p>
      )}
    </div>
  );
};

export default TaskCompleted;
