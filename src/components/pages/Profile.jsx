import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersAPI } from "../common/http-api";
import { useTranslation } from "react-i18next";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [userInput, setUserInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    phone: "",
  });
  const [t, i18n] = useTranslation("global");
  // console.log("i18n: ", i18n);

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

        console.log("User Data Response:", response.data.user);
        setUser(response.data.user);

        setUserInput({
          first_name: response.data.user.first_name || "",
          last_name: response.data.user.last_name || "",
          email: response.data.user.email || "",
          gender: response.data.user.gender || "",
          phone: response.data.user.phone || "",
        });
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return `${formattedDate} at ${formattedTime}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    if (!file) {
      setUploadMessage("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", file);

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${usersAPI.url}/${user.user_id}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadMessage("Profile image uploaded successfully!");
      setUser({ ...user, profile_image: URL.createObjectURL(file) }); // Update the displayed image
      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Image upload error:", error.response || error.message);
      setUploadMessage("Failed to upload image. Please try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.put(
        `${usersAPI.url}/${user.user_id}`,
        userInput,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Updated user data:", response.data);

      setUser(response.data.updatedUser);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(
        "Error updating user profile:",
        err.response?.data?.message || err.message
      );
      alert(err.response?.data?.message || "Failed to update profile.");
    }
  };

  if (error) {
    return (
      <>
        <h1 className="text-red-500">Error: {error}</h1>
        <p onClick={() => navigate("/login")}>Login to start again</p>
      </>
    );
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">{t("profile.heading")}</h1>
        <Link to="/dashboard" className="text-lg font-semibold hover:underline">
          {t("profile.goBack")}
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg">
        <div className="relative flex items-center space-x-6 mb-6">
          <div className="relative group">
            <img
              src={
                user?.profile_image ||
                "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
              }
              alt="User Icon"
              className="rounded-full w-48 h-48 border-1 border-gray-400"
            />

            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
              <label
                htmlFor="profile_image"
                className="text-white text-sm font-semibold cursor-pointer"
              >
                {t("profile.changePhoto")}
              </label>
              <input
                type="file"
                id="profile_image"
                name="profile_image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold italic">
              {user?.first_name || "Guest first_name"}{" "}
              {user?.last_name || "Guest last_name"}
            </h2>
            <h2 className="text-xl font-bold">{user?.username || "Guest"}</h2>
            <p className="text-gray-500 text-lg">
              {user?.email || "guest@example.com"}
            </p>
            <p className="text-gray-500 text-lg">
              {t("profile.registeredAt")}:{" "}
              {user?.registration_date
                ? formatDate(user.registration_date)
                : "N/A"}
            </p>
          </div>
        </div>

        {uploadMessage && (
          <p className="text-sm text-gray-500 mb-4">{uploadMessage}</p>
        )}

        <form
          className="border-1 border-gray-400 p-8 rounded-xl"
          onSubmit={handleUpdate}
        >
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="first_name" className="block font-bold mb-1">
                {t("profile.inputField.firstName")}
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={userInput.first_name}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
              />
            </div>
            <div>
              <label htmlFor="last_name" className="block font-bold mb-1">
                {t("profile.inputField.lastName")}
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={userInput.last_name}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold mb-1">
                {t("profile.inputField.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userInput.email}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
              />
            </div>
            <div className="flex items-center w-1/2 space-x-6">
              <div className="flex-1">
                <label htmlFor="phone" className="block font-bold mb-1">
                  {t("profile.inputField.contactNumber")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userInput.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="gender" className="block font-bold mb-1">
                  {t("profile.inputField.gender")}
                </label>
                <select
                  name="gender"
                  id="gender"
                  value={userInput.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
                >
                  <option value="Male">
                    {t("profile.inputField.genderOptions.option1")}
                  </option>
                  <option value="Female">
                    {t("profile.inputField.genderOptions.option2")}
                  </option>
                  <option value="Other">
                    {t("profile.inputField.genderOptions.option3")}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              {t("profile.inputField.buttons.button1")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile/changepw")}
              className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              {t("profile.inputField.buttons.button2")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
