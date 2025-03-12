import { faChartBar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { buildStyles } from "react-circular-progressbar";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const TaskStatus = ({ tasks }) => {
  const allTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const notCompletedTasks = tasks.filter((task) => !task.is_completed).length;
  const completedTasksPercentage = Math.round((completedTasks / allTasks) * 100);
  const notCompletedTasksPercentage = Math.round((notCompletedTasks / allTasks) * 100);

  const [t, i18n] = useTranslation("global");

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <h2 className="text-xl font-semibold mb-4 text-red-400">
        <FontAwesomeIcon icon={faChartBar} className="pr-2 text-gray-400" />
        {t("dashBoard.taskStatus.title")}
      </h2>
      <div className="flex justify-around items-center">
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-lg font-semibold">
              <CircularProgressbarWithChildren
                value={completedTasksPercentage}
                className="w-36 h-36"
                styles={buildStyles({ textColor: "black", pathColor: "green" })}
              >
                <FontAwesomeIcon icon={faCheck} className="text-4xl" />
                <p>{completedTasksPercentage}%</p>
              </CircularProgressbarWithChildren>
            </span>
          </div>
          <p className="mt-2 text-lg font-semibold">
            <span className="w-3 h-3 bg-green-500 rounded-full inline-block mr-2"></span>
            {t("dashBoard.taskStatus.yes")}
          </p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="text-lg font-semibold">
              <CircularProgressbarWithChildren
                value={notCompletedTasksPercentage}
                className="w-36 h-36"
                styles={buildStyles({ textColor: "black", pathColor: "red" })}
              >
                <FontAwesomeIcon icon={faXmark} className="text-4xl" />
                <p>{notCompletedTasksPercentage}%</p>
              </CircularProgressbarWithChildren>
            </span>
          </div>
          <p className="mt-2 text-lg font-semibold">
            <span className="w-3 h-3 bg-red-500 rounded-full inline-block mr-2"></span>
            {t("dashBoard.taskStatus.no")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
