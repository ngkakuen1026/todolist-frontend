import axios from "axios";
import { useEffect, useState } from "react";
import { tasksAPI, usersAPI } from "../common/http-api";
import { useNavigate } from "react-router-dom";
import DashBoardTaskList from "../reusable/DashBoardTaskList";
import TaskStatus from "../reusable/TaskStatus";
import TaskCompleted from "../reusable/TaskCompleted";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");

  // Fetch user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");

        const response = await axios.get(`${usersAPI.url}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (err) {
        console.error(
          "Error fetching user profile:",
          err.response?.data?.message || err.message
        );
        setError(err.response?.data?.message || "Failed to fetch user profile");
      }
    };

    fetchUserInfo();
  }, []);

  // Fetch tasks
  useEffect(() => {
    const fetchTaskInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("No authentication token found");

        const response = await axios.get(`${tasksAPI.url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data.tasks);
      } catch (err) {
        console.error(
          "Error fetching tasks:",
          err.response?.data?.message || err.message
        );
        setError(err.response?.data?.message || "Failed to fetch tasks");
      }
    };

    fetchTaskInfo();
  }, []);

  if (error) {
    return (
      <>
        <h1 className="text-red-600">Error: {error}</h1>
        <p
          className="text-blue-400 cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/login")}
        >
          Login to start again
        </p>
      </>
    );
  }

  if (!user) {
    return (
      <p className="text-blue-400 cursor-pointer hover:text-blue-600">
        Loading...
      </p>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-6xl font-bold">
          {t("dashBoard.heading")}, {user.username} 👋👋
        </h1>
      </div>
      <div className="p-6">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <DashBoardTaskList tasks={tasks} />
            <div className="space-y-6 lg:col-span-2">
              <TaskStatus tasks={tasks} />
              <TaskCompleted tasks={tasks} /> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
