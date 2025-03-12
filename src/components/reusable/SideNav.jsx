import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faClipboard,
  faClipboardCheck,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { usersAPI } from "../common/http-api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

const SideNav = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const [t, i18n] = useTranslation("global")
  
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }
  
  return (
    <nav className="w-80 text-white p-4 my-10 bg-red-400 h-screen text-2xl rounded-lg flex flex-col shadow-md">
      <div className="text-center ">
        <Link to="/profile">
          <img
            src={
              user.profile_image ||
              "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
            }
            alt="User icon"
            className="rounded-full mx-auto w-48 h-48 mb-2 hover:shadow-md"
          />
          <p className="font-bold">{user.username || "Guest"}</p>
          <p className="text-sm">{user.email || "guest@example.com"}</p>
        </Link>
      </div>
      <ul className="space-y-8 flex-grow mt-8">
        <li className="">
          <Link
            to="/dashboard"
            className="block py-2 px-4 rounded hover:bg-white hover:text-red-400"
          >
            <FontAwesomeIcon icon={faClipboard} className="pr-5 h-6 w-6" />
            {t("sideNav.option1")}
          </Link>
        </li>
        <li>
          <Link
            to="/my-task"
            className="block py-2 px-4 rounded hover:bg-white hover:text-red-400"
          >
            <FontAwesomeIcon icon={faClipboardCheck} className="pr-5 h-6 w-6" />
            {t("sideNav.option2")}
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
            className="block py-2 px-4 rounded hover:bg-white hover:text-red-400"
          >
            <FontAwesomeIcon icon={faGear} className="pr-5 h-6 w-6" />
            {t("sideNav.option3")}
          </Link>
        </li>
        <li>
          <Link
            to="/help"
            className="block py-2 px-4 rounded hover:bg-white hover:text-red-400"
          >
            <FontAwesomeIcon icon={faCircleQuestion} className="pr-5 h-6 w-6" />
            {t("sideNav.option4")}
          </Link>
        </li>
        {user ? (
          <button
            onClick={handleLogout}
            className="block w-full text-left py-2 px-4 rounded hover:bg-white hover:text-red-400 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="pr-5 h-6 w-6"
            />
            {t("sideNav.option5")}
          </button>
        ) : (
          <Link
            to="/register"
            className="block py-2 px-4 rounded hover:bg-white hover:text-red-400"
          >
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              className="pr-5 h-6 w-6"
            />
            {t("sideNav.option6")}
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default SideNav;
