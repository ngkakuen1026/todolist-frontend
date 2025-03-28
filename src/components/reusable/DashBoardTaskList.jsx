import { useState } from "react";
import TaskCard from "./TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DashBoardTaskList = ({ tasks }) => {
  const [t, i18n] = useTranslation("global");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2;

  const lastTaskIndex = currentPage * tasksPerPage;
  const firstTaskIndex = lastTaskIndex - tasksPerPage;
  const currentTasks = tasks.slice(firstTaskIndex, lastTaskIndex);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="lg:col-span-2 shadow-lg p-10 rounded-lg flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center text-2xl">
          <FontAwesomeIcon icon={faCalendar} className="pr-2 text-gray-400" />
          <h1 className="text-red-400 font-bold">
            {t("dashBoard.dashBoardTaskList.title")}
          </h1>
        </div>

        <button className="text-sm mx-4 my-2 rounded-lg hover:opacity-50 hover:border-none hover:cursor-pointer">
          <Link to="/add-task">
            <FontAwesomeIcon icon={faPlus} />
            {t("dashBoard.dashBoardTaskList.addTask")}
          </Link>
        </button>
      </div>

      <div className="space-y-6 rounded-lg py-4 flex-grow">
        {currentTasks.map((task, index) => (
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

      <div className="flex justify-between items-center mt-6 sticky bottom-0 bg-white py-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-400 text-white hover:bg-red-600"
          }`}
        >
          {t("dashBoard.dashBoardTaskList.previous")}
        </button>
        <p className="text-gray-600">
          {t("dashBoard.dashBoardTaskList.page")} {currentPage}{" "}
          {t("dashBoard.dashBoardTaskList.of")} {totalPages}
        </p>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-red-400 text-white hover:bg-red-600"
          }`}
        >
          {t("dashBoard.dashBoardTaskList.next")}
        </button>
      </div>
    </div>
  );
};

export default DashBoardTaskList;
