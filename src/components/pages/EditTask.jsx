import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { tasksAPI } from "../common/http-api";
import { InputField } from "../reusable/InputField";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";

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
  const [t, i18n] = useTranslation("global");
  const [errorMessage, setErrorMessage] = useState("");

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

  const validateInput = () => {
    if (!userInput.title.trim()) {
      setErrorMessage(t("editTask.inputField.errors.titleRequired"));
      return false;
    }
    if (!userInput.description.trim()) {
      setErrorMessage(t("editTask.inputField.errors.descriptionRequired"));
      return false;
    }
    if (userInput.is_completed === null) {
      setErrorMessage(t("editTask.inputField.errors.isCompletedRequired"));
      return false;
    }
    setErrorMessage("");
    return true;
  };

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

    if (!validateInput()) return;

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
        <h1 className="text-4xl font-bold">{t("editTask.heading")}</h1>
        <Link to="/dashboard" className="text-lg font-semibold hover:underline">
          {t("editTask.goBack")}
        </Link>
      </div>
      <div>
        <form
          action="submit"
          className="border-1 border-gray-400 p-8 rounded-xl"
          onSubmit={handleEdit}
        >
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <label htmlFor="title" className="block font-bold mb-1">
                  {t("editTask.inputField.title")}
                </label>
                <InputField
                  type="text"
                  name="title"
                  placeholder={t("editTask.inputField.taskTitle")}
                  value={userInput.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="is_completed" className="block font-bold mb-1">
                  {t("editTask.inputField.completed")}
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
                    {t("editTask.inputField.completedOptions.yes")}
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
                    {t("editTask.inputField.completedOptions.no")}
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block font-bold mb-1">
                  {t("editTask.inputField.desciprtion")}
                </label>
                <textarea
                  name="description"
                  placeholder={t("editTask.inputField.taskDesciprtion")}
                  value={userInput.description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 h-64"
                />
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-full">
                <label htmlFor="task_image" className="block font-bold mb-1">
                  {t("editTask.inputField.uploadTaskImage")}
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
                        : t("editTask.inputField.chooseImage")}
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
              {t("editTask.inputField.buttons.button1")}
            </button>
            <button
              type="button"
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              onClick={() => navigate("/my-task")}
            >
              {t("editTask.inputField.buttons.button2")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
