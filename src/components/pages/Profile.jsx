import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersAPI } from "../common/http-api";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

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

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Account Information</h1>
        <Link to="/dashboard" className="text-lg font-semibold hover:underline">
          Go Back
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
              Registered at:{" "}
              {user?.registration_date
                ? formatDate(user.registration_date)
                : "N/A"}
            </p>
          </div>
        </div>

        <form className="border-1 border-gray-400 p-8 rounded-xl">
          <div className="flex flex-col space-y-4">
            <div>
              <label htmlFor="first-name" className="block font-bold mb-1">
                First Name
              </label>
              <input
                type="text"
                id="first-name"
                defaultValue={user?.first_name || ""}
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block font-bold mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                defaultValue={user?.last_name || ""}
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="block font-bold mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                defaultValue={user?.email || ""}
                className="w-1/2 px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1"
              />
            </div>
            <div className="flex items-center w-1/2 space-x-6">
              <div className="flex-1">
                <label htmlFor="phone" className="block font-bold mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  defaultValue={user?.phone || ""}
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-400"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="gender" className="block font-bold mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  id="gender"
                  defaultValue={user?.gender || "Male"}
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Update Info
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile/changepw")}
              className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
