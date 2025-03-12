import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { authAPI } from "../common/http-api";
import { AuthInputField } from "../reusable/AuthInputField";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [userInput, setUserInput] = useState({
    first_name: "",
    last_name: "",
    username: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [t, i18n] = useTranslation("global");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const validateInput = () => {
    if (
      !userInput.first_name ||
      !userInput.last_name ||
      !userInput.username ||
      !userInput.email ||
      !userInput.password ||
      !userInput.gender
    ) {
      setErrorMessage("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInput.email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (userInput.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!validateInput()) {
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post(`${authAPI.url}/register`, userInput);
      setSuccessMessage(response.data.message || "Registration successful!");
      setUserInput({
        first_name: "",
        last_name: "",
        username: "",
        gender: "",
        phone: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Registration failed.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/3 flex flex-col justify-center items-center bg-gradient-to-br from-sky-600 to-sky-400">
        <h2 className="text-6xl text-white font-bold text-center mb-6">
          {t("register.heading4")}
        </h2>
        <p className="text-2xl text-white text-center mb-6">
          {t("register.heading5")}
        </p>
        <div className="flex items-center justify-center">
          <a href="/login">
            <button
              className="w-64 bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-gray-200 flex items-center justify-center
              transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150"
            >
              {t("register.loginButton")}
              <FontAwesomeIcon icon={faUser} className="pl-1" />
            </button>
          </a>
        </div>
      </div>

      <div className="w-2/3 flex flex-col justify-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-6 text-center">
          {t("register.heading")}
        </h1>
        <h1 className="text-2xl italic text-gray-400 mb-6 text-center">
          {t("register.heading2")}
        </h1>

        {errorMessage && (
          <div className="text-center text-red-500 mb-4">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="text-center text-green-500 mb-4">
            {successMessage}
          </div>
        )}

        <form className="mx-10" onSubmit={handleRegister}>
          <div className="flex justify-center gap-x-5">
            <div className="w-1/2">
              <div className="mb-4">
                <AuthInputField
                  type="text"
                  name="first_name"
                  placeholder={t("register.inputField.firstName")}
                  value={userInput.first_name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="mb-4">
                <AuthInputField
                  type="text"
                  name="last_name"
                  placeholder={t("register.inputField.lastName")}
                  value={userInput.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-x-5">
            <div className="w-1/3">
              <div className="mb-4">
                <AuthInputField
                  type="text"
                  name="username"
                  placeholder={t("register.inputField.username")}
                  value={userInput.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="mb-4">
                <AuthInputField
                  type="text"
                  name="phone"
                  placeholder={t("register.inputField.phone")}
                  value={userInput.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-1/3">
              <div className="mb-4">
                <select
                  className="w-full px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 bg-gray-100"
                  name="gender"
                  value={userInput.gender}
                  onChange={handleChange}
                >
                  <option value="">{t("register.inputField.gender")}</option>
                  <option value="Male">{t("register.inputField.genderOptions.option1")}</option>
                  <option value="Female">{t("register.inputField.genderOptions.option2")}</option>
                  <option value="Other">{t("register.inputField.genderOptions.option3")}</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-center">
            <AuthInputField
              type="email"
              name="email"
              placeholder={t("register.inputField.email")}
              value={userInput.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6 justify-center">
            <div className="relative">
              <AuthInputField
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("register.inputField.password")}
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
              className={`w-64 bg-sky-600 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sky-800"
              } text-white font-bold py-4 px-8 rounded-full flex items-center justify-center transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150`}
              type="submit"
              disabled={isSubmitting}
            >
              {t("register.inputField.registerButton")}
              <FontAwesomeIcon icon={faUser} className="pl-1" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
