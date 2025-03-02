import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const TaskCard = ({
  title,
  timeCreated,
  description,
  isCompleted,
  task_image,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <div className="bg-white shadow-md rounded-lg px-4 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex justify-between text-gray-500">
          <FontAwesomeIcon icon={faPenToSquare} className="hover:cursor-pointer hover:text-red-400 pr-2" />
          <FontAwesomeIcon icon={faTrashCan} className="hover:cursor-pointer hover:text-red-400" />
        </div>
      </div>
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-lg mt-2 ">{description}</p>
        {task_image && (
          <img
            src={
              task_image
                ? task_image
                : "https://cdn-icons-png.flaticon.com/512/4345/4345573.png"
            }
            alt={title}
            className="w-64 h-64 object-cover rounded-lg"
          />
        )}
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          Status:{" "}
          <span
            className={`font-medium ${
              isCompleted ? "text-green-500" : "text-red-500"
            }`}
          >
            {isCompleted ? "Completed" : "Not Completed"}
          </span>
        </p>
        <span className="text-sm text-gray-400">
          Created at: {formatDate(timeCreated)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
