import React from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
  return (
    <div className="lg:col-span-2 space-y-6 border-1 rounded-lg border-gray-400 p-4">
      {tasks.map((task, index) => (
        <TaskCard
          key={index}
          title={task.title}
          timeCreated={task.time_created}
          description={task.description}
          isCompleted={task.is_completed}
          task_image={task.task_image}
        />
      ))}
    </div>
  );
};

export default TaskList;