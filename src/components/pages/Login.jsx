import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthInputField } from "../reusable/AuthInputField";
import { authAPI } from "../common/http-api";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [t, i18n] = useTranslation("global");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post(`${authAPI.url}/login`, userInput);

      const token = response.data.accessToken;
      if (!token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("authToken", token);
      console.log("Token saved:", token);

      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message);
      setErrorMessage(err.response?.data?.message || "Login failed");
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-2/3 flex flex-col justify-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-6 text-center">
          {t("login.heading")}
        </h1>
        <h1 className="text-2xl italic text-gray-400 mb-6 text-center">
          {t("login.heading2")}
        </h1>

        {errorMessage && (
          <div className="text-center text-red-500 mb-4">{errorMessage}</div>
        )}

        <form className="mx-10" onSubmit={handleLogin}>
          <div className="mb-6 justify-center">
            <div className="relative">
              <AuthInputField
                type="text"
                name="username"
                placeholder={t("login.inputField.username")}
                value={userInput.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-6 justify-center">
            <div className="relative">
              <AuthInputField
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("login.inputField.password")}
                value={userInput.password}
                onChange={handleChange}
              />
              {showPassword ? (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl hover:cursor-pointer"
                  onClick={handleTogglePassword}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEye}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl hover:cursor-pointer"
                  onClick={handleTogglePassword}
                />
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="w-64 bg-sky-600 hover:bg-sky-800 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center button-width transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150"
              type="submit"
            >
              {t("login.inputField.loginButton")}
              <FontAwesomeIcon icon={faUser} className="pl-1" />
            </button>
          </div>
        </form>
      </div>

      <div className="w-1/3 flex flex-col justify-center items-center bg-gradient-to-br from-red-600 to-red-400">
        <h2 className="text-6xl text-white font-bold text-center mb-6">
          {t("login.heading4")}
        </h2>
        <p className="text-2xl text-white text-center mb-6">
          {t("login.heading5")}
        </p>
        <div className="flex items-center justify-center">
          <a href="/register">
            <button
              className="w-64 bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-gray-200 flex items-center justify-center
              transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150"
            >
              {t("login.registerButton")}
              <FontAwesomeIcon icon={faUser} className="pl-1" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
