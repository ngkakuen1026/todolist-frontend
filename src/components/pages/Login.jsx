import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGoogle,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { AuthInputField } from "../reusable/AuthInputField";
import { authAPI } from "../common/http-api";
import axios from "axios";

const Login = () => {
  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages
  
    try {
      // Send request to login API
      const response = await axios.post(`${authAPI.url}/login`, userInput);
  
      // Access the token from the response
      const token = response.data.accessToken; // Use `accessToken` as per your backend response
      if (!token) {
        throw new Error("Token not found in response");
      }
  
      // Save the token to localStorage
      localStorage.setItem("authToken", token);
      console.log("Token saved:", token); // Debugging: Ensure the token is being saved
  
      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data?.message || err.message); // Log error message
      setErrorMessage(err.response?.data?.message || "Login failed"); // Display server-side or fallback error message
    }
  };

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-2/3 flex flex-col justify-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-6 text-center">
          Login your account
        </h1>
        <h1 className="text-2xl italic text-gray-400 mb-6 text-center">
          Using your username and password to login!
        </h1>

        {/* Display error message */}
        {errorMessage && (
          <div className="text-center text-red-500 mb-4">{errorMessage}</div>
        )}

        {/* Login form */}
        <form className="mx-10" onSubmit={handleLogin}>
          {/* Username input */}
          <div className="mb-6 justify-center">
            <div className="relative">
              <AuthInputField
                type="text"
                name="username"
                placeholder="Enter your Username"
                value={userInput.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password input */}
          <div className="mb-6 justify-center">
            <div className="relative">
              <AuthInputField
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
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

          {/* Login button */}
          <div className="flex justify-center">
            <button
              className="w-64 bg-sky-600 hover:bg-sky-800 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center button-width transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150"
              type="submit"
            >
              Login
              <FontAwesomeIcon icon={faUser} className="pl-1" />
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex justify-center mx-10 my-5">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>
        </div>

        {/* Social login buttons */}
        <div>
          <h1 className="text-2xl italic text-gray-400 mb-6 text-center">
            Using Google, Facebook or Twitter to login
          </h1>
        </div>
        <div className="flex justify-center mb-5">
          <button
            className="w-max bg-gray-200 hover:bg-gray-300 text-black py-4 px-8 rounded-lg flex items-center justify-center
              button-width
              transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150"
            type="button"
          >
            Continue with Google
            <FontAwesomeIcon icon={faGoogle} className="pl-1.5 text-2xl" />
          </button>
        </div>
        <div className="flex justify-center mb-5">
          <button
            className="w-max bg-gray-200 hover:bg-gray-300 text-black py-4 px-8 rounded-lg flex items-center justify-center
              button-width
              transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150"
            type="button"
          >
            Continue with Facebook
            <FontAwesomeIcon icon={faFacebook} className="pl-1.5 text-2xl" />
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="w-max bg-gray-200 hover:bg-gray-300 text-black py-4 px-8 rounded-lg flex items-center justify-center
              button-width
              transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150"
            type="button"
          >
            Continue with Twitter
            <FontAwesomeIcon icon={faTwitter} className="pl-1.5 text-2xl" />
          </button>
        </div>
      </div>

      {/* Registration section */}
      <div className="w-1/3 flex flex-col justify-center items-center bg-gradient-to-br from-red-600 to-red-400">
        <h2 className="text-6xl text-white font-bold text-center mb-6">
          Not Registered?
        </h2>
        <p className="text-2xl text-white text-center mb-6">
          Click here to register!
        </p>
        <div className="flex items-center justify-center">
          <a href="/register">
            <button
              className="w-64 bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-gray-200 flex items-center justify-center
              transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-150"
            >
              Register
              <FontAwesomeIcon icon={faUser} className="pl-1" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
