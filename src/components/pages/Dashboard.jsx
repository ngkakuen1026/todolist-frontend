import axios from "axios";
import { useEffect, useState } from "react";
import { tasksAPI, usersAPI } from "../common/http-api";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import TaskList from "../reusable/TaskList";
import TaskStatus from "../reusable/TaskStatus";
import TaskCompleted from "../reusable/TaskCompleted";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

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
        <h1 className="text-red-500">Error: {error}</h1>
        <p onClick={() => Navigate("/login")}>Login to start again</p>
      </>
    );
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <h1 className="text-6xl font-bold">
          Welcome back, {user.username} 👋👋
        </h1>
      </div>
      <div className="p-6">
        <div className="mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center text-2xl">
              <FontAwesomeIcon icon={faCalendar} className="pr-2 text-gray-400"/>
              <h1 className="text-red-400 font-bold">To-Do</h1>
            </div>

            <button className="text-sm px-4 py-2 rounded-lg hover:border-none hover:cursor-pointer">
              <FontAwesomeIcon icon={faPlus} /> Add Task
            </button>
          </div>

          <p className="text-gray-500 mb-4">Date</p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <TaskList tasks={tasks} />

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
