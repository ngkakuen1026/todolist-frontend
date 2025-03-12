import { useTranslation } from "react-i18next";

const TaskCard = ({
  title,
  timeCreated,
  description,
  isCompleted,
  task_image,
}) => {
  const [t, i18n] = useTranslation("global");
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
    <div className="bg-white shadow-lg rounded-lg px-4 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex justify-between items-start">
        <p className="text-gray-500 text-lg mt-2">{description}</p>
        <img
          src={
            task_image == null
              ? "https://cdn-icons-png.flaticon.com/512/4345/4345573.png"
              : task_image
          }
          alt={title}
          className="w-64 h-64 object-cover rounded-lg mr-20"
        />
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-500">
          {t("dashBoard.taskCard.status")}:{" "}
          <span
            className={`font-medium ${
              isCompleted ? "text-green-500" : "text-red-500"
            }`}
          >
            {isCompleted
              ? t("dashBoard.taskCard.statusOptions.yes")
              : t("dashBoard.taskCard.statusOptions.no")}
          </span>
        </p>
        <span className="text-sm text-gray-400">
          {t("dashBoard.taskCard.createdAt")}: {formatDate(timeCreated)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
