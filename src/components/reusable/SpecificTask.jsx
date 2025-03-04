import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios"; // Import axios for API calls
import { tasksAPI } from "../common/http-api";
import { useNavigate } from "react-router-dom";

const SpecificTask = ({ task, onTaskDeleted }) => {
  const navigate = useNavigate();
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

  const handleEditTask = () => {
    navigate("/edit-task", { state: { task } });
  };

  const handleDeleteTask = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    console.log("Deleting task with ID:", task.task_id);

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.delete(`${tasksAPI.url}/${task.task_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert("Task deleted successfully!");
        onTaskDeleted(task.task_id);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete the task. Please try again.");
    }
  };

  if (!task) {
    return <p className="text-gray-500">Select a task to view details.</p>;
  }

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-sm h-full flex flex-col justify-between">
      <div>
        <div className="flex gap-x-4 mb-4">
          <div className="font-bold mb-2">
            <img
              src={
                task.task_image ||
                "https://cdn-icons-png.flaticon.com/512/4345/4345573.png"
              }
              alt={task.title}
              className="h-96 w-128 object-cover rounded-lg"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold mb-2">{task.title}</h2>
            <p className="text-xl font-semibold">
              Status:{" "}
              <span
                className={`${
                  task.is_completed ? "text-green-500" : "text-red-500"
                } font-semibold`}
              >
                {task.is_completed ? "Completed" : "Not Completed"}
              </span>
            </p>
            <p className="text-gray-400 text-lg italic">
              Created at: {formatDate(task.time_created)}
            </p>
          </div>
        </div>
        <div>
          <p className="mb-2 text-xl">
            <span className="font-semibold">Description:</span>
            <span className="text-gray-600"> {task.description}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="text-2xl bg-blue-500 rounded-lg text-white p-2 hover:cursor-pointer hover:opacity-80"
          onClick={handleEditTask}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          className="text-2xl bg-red-500 rounded-lg text-white p-2 hover:cursor-pointer hover:opacity-80"
          onClick={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default SpecificTask;
