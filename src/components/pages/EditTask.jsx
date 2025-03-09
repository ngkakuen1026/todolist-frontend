import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { tasksAPI } from "../common/http-api";
import { InputField } from "../reusable/InputField";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";

const EditTask = () => {
  const { task_id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    is_completed: false,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${tasksAPI.url}/${task_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTask(response.data.task);

        setUserInput({
          title: response.data.task.title || "",
          description: response.data.task.description || "",
          is_completed: response.data.task.is_completed || false,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching task:", error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [task_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserInput({
      ...userInput,
      [name]: name === "is_completed" ? value === "true" : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const formData = new FormData();
      formData.append("title", userInput.title);
      formData.append("description", userInput.description);
      formData.append("is_completed", userInput.is_completed);
      if (selectedImage) {
        formData.append("task_image", selectedImage);
      }

      await axios.put(`${tasksAPI.url}/${task_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Task updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update the task. Please try again.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Edit Task</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-lg font-semibold hover:underline"
        >
          Go Back
        </button>
      </div>
      <div>
        <form
          action="submit"
          className="border-1 border-gray-400 p-8 rounded-xl"
          onSubmit={handleEdit}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <label htmlFor="title" className="block font-bold mb-1">
                  Title
                </label>
                <InputField
                  type="text"
                  name="title"
                  placeholder="Enter your task title"
                  value={userInput.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="is_completed" className="block font-bold mb-1">
                  Is it Completed?
                </label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="is_completed"
                      value="true"
                      checked={userInput.is_completed === true}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    True
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="is_completed"
                      value="false"
                      checked={userInput.is_completed === false}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    False
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block font-bold mb-1">
                  Task Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter your task description"
                  value={userInput.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 h-64"
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-full">
                <label htmlFor="task_image" className="block font-bold mb-1">
                  Upload Task Image
                </label>
                <div className="relative">
                  <label
                    htmlFor="task_image"
                    className="flex flex-col items-center justify-center space-y-2 px-4 py-2 h-64 text-center border border-gray-400 rounded-lg text-gray-500 cursor-pointer bg-white focus-within:ring-1 focus-within:ring-gray-400"
                  >
                    <FontAwesomeIcon
                      icon={faImage}
                      className="text-gray-500 text-3xl"
                    />
                    <span>
                      {selectedImage
                        ? selectedImage.name
                        : "Choose an image..."}
                    </span>
                  </label>
                  <input
                    type="file"
                    name="task_image"
                    id="task_image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={() => navigate("/my-task")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
