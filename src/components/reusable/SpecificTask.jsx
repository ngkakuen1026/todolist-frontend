const SpecificTask = ({ task }) => {
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

  if (!task) {
    return <p className="text-gray-500">Select a task to view details.</p>;
  }

  return (
    <div className=" p-6 border border-gray-300 rounded-lg shadow-sm h-full">
      <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
      <p className="text-gray-600 mb-2">Description: {task.description}</p>
      <p className="text-gray-600 mb-2">
        Created at: {formatDate(task.time_created)}
      </p>
      <p className="">
        Status:{" "}
        <span
          className={`${
            task.is_completed ? "text-green-500" : "text-red-500"
          } font-semibold`}
        >
          {task.is_completed ? "Completed" : "Not Completed"}
        </span>
      </p>
      <img
        src={
          task.task_image ||
          "https://cdn-icons-png.flaticon.com/512/4345/4345573.png"
        }
        alt={task.title}
        className="w-64 h-64 object-cover rounded-lg mr-20"
      />
    </div>
  );
};

export default SpecificTask;
