import React from "react";
import { Link } from "react-router-dom";

const MyTask = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold">My Task</h1>
      <Link to="/dashboard" className="text-lg font-semibold hover:underline">
        Go Back
      </Link>
    </div>
  );
};

export default MyTask;
