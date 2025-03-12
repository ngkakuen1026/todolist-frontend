import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { tasksAPI } from "../common/http-api";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldShowSearchInput =
    location.pathname == "/my-task" || location.pathname == "/search-results";
  const [userInput, setUserInput] = useState();
  const [t, i18n] = useTranslation("global");

  const getCurrentWeekDay = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date();
    const day = weekday[d.getDay()];
    return day;
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(
        `${tasksAPI.url}/search?query=${userInput}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data.tasks);
      navigate("/search-results", { state: { tasks: response.data.tasks } });
    } catch (error) {
      console.error(
        "Error fetching task details:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <header className="flex justify-between items-center py-10 px-24 shadow-md header-bg">
      <div className="w-1/3 flex items-center justify-start">
        <Link to="/dashboard">
          <span className="font-bold text-4xl text-red-500">ToDo</span>
          <span className="font-bold text-4xl">Ly</span>
        </Link>
      </div>

      {shouldShowSearchInput && (
        <div className="w-1/3 flex items-center justify-center relative">
          <input
            type="text"
            placeholder="Search your task here..."
            className="border border-gray-300 rounded-lg px-4 py-2 w-full pr-10"
            onChange={handleChange}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-600 hover:cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      )}

      <div className="w-1/3 flex flex-col items-end">
        <div className="text-xl">
          {t("header.message")}{" "}
          <span className="text-cyan-500">
            {new Date().toLocaleDateString()}
          </span>
          ,
        </div>
        <div className="text-lg">
          {t("header.message2")}{" "}
          <span className="font-bold text-black">{getCurrentWeekDay()}</span>😊!
        </div>
      </div>
    </header>
  );
};

export default Header;
