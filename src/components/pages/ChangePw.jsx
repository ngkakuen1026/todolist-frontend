import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersAPI } from "../common/http-api";
import { useTranslation } from "react-i18next";

const ChangePw = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [t, i18n] = useTranslation("global");

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

  const formatDate = (String) => {
    const date = new Date(String);

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (userInput.newPassword !== userInput.confirmPassword) {
      setFormError("New password and confirmation password do not match.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No authentication token found");

      // Make API call to update the password
      const response = await axios.put(
        `${usersAPI.url}/${user.user_id}/changepassword`,
        {
          oldPassword: userInput.oldPassword,
          newPassword: userInput.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Password updated successfully:", response.data);
      alert("Password updated successfully!");
      navigate("/profile"); // Navigate back to the profile page after success
    } catch (err) {
      console.error(
        "Error updating password:",
        err.response?.data?.message || err.message
      );
      setFormError(err.response?.data?.message || "Failed to update password.");
    }
  };

  if (error) {
    return (
      <>
        <h1 className="text-red-500">Error: {error}</h1>;<p></p>
        <p
          onClick={() => navigate("/login")}
          className="hover:opacity-50 cursor-pointer"
        >
          Login to start again
        </p>
      </>
    );
  }

  if (formError) {
    return (
      <>
        <h1 className="text-red-500">Error: {formError}</h1>
        <p></p>
        <p
          onClick={() => navigate("/profile")}
          className="hover:opacity-50 cursor-pointer"
        >
          Try again
        </p>
      </>
    );
  }

  if (!user) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Account Information</h1>
        <Link to="/profile" className="text-lg font-semibold hover:underline">
          {t("profile.goBack")}
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg">
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={
              user?.profile_image ||
              "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
            }
            alt="User Icon"
            className="rounded-full w-48 h-48 border-1 border-gray-400"
          />
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

        <form
          className="border-1 border-gray-400 p-8 rounded-xl"
          onSubmit={handleUpdate}
        >
          <div className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="original-password"
                className="block font-bold mb-1"
              >
                {t("profile.changepw.originalPw")}
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                value={userInput.oldPassword}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
                required
              />
            </div>
            <div>
              <label htmlFor="new-password" className="block font-bold mb-1">
                {t("profile.changepw.newPw")}
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={userInput.newPassword}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block font-bold mb-1"
              >
                {t("profile.changepw.confirmPw")}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={userInput.confirmPassword}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
              />
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              {t("profile.changepw.buttons.button1")}
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              {t("profile.changepw.buttons.button2")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePw;
