import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tasksAPI } from "../common/http-api";
import MyTaskTaskList from "../reusable/MyTaskTaskList";
import SpecificTask from "../reusable/SpecificTask";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null); // State to store the selected task
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const fetchSpecificTask = async (taskId) => {
    console.log("Fetching task with ID:", taskId);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");
  
      const response = await axios.get(`${tasksAPI.url}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("API Response:", response.data); 
      setSelectedTask(response.data.task);
    } catch (err) {
      console.error(
        "Error fetching task details:",
        err.response?.data?.message || err.message
      );
      setError(err.response?.data?.message || "Failed to fetch task details");
    }
  };

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">My Task</h1>
      </div>
      <div className="p-6">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <MyTaskTaskList tasks={tasks} onTaskClick={fetchSpecificTask} />
            <div className="space-y-6 lg:col-span-6">
              <SpecificTask task={selectedTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTask;