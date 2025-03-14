import { faCalendarCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const TaskCompleted = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.is_completed);
  const [t, i18n] = useTranslation("global");
  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <h2 className="text-xl font-semibold mb-4 text-red-400">
        <FontAwesomeIcon
          icon={faCalendarCheck}
          className="pr-2 text-gray-400"
        />
        {t("dashBoard.completedTask.title")}
      </h2>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <div key={task.task_id} className="flex items-start space-x-4 mb-4">
            <img
              src={
                task.task_image ||
                "https://cdn-icons-png.flaticon.com/512/4345/4345573.png"
              }
              alt={task.title}
              className="w-24 h-24 rounded-lg"
            />
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-500 break-words whitespace-normal max-w-xl">{task.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {t("dashBoard.completedTask.completedOn")}{" "}
                {new Date(task.time_created).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">{t("dashBoard.completedTask.noTaskCompleted")}</p>
      )}
    </div>
  );
};

export default TaskCompleted;
