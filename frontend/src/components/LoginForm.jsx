import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const LoginForm = ({ role, setIsOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [error, setError] = useState("");

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before request

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful", data);

      // Store the token in localStorage
      localStorage.setItem("authToken", data.token);
      // Store the sessionId in cookies
      Cookies.set("sessionId", data.sessionId);

      // Close the modal
      setIsOpen(false);

      // Reload the page to reflect the login status
      window.location.reload(); // Hard refresh
    } catch (error) {
      setError(error.message); // Show error message
    }
  };

  // Handle registration submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state before request

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (response.status !== 201) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("Registration successful", data);

      // Store the token or handle registration as needed
      localStorage.setItem("authToken", data.token);

      // Close the modal
      setIsOpen(false);

      // Reload the page to reflect the registration status
      window.location.reload(); // Hard refresh
    } catch (error) {
      setError(error.message); // Show error message
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-center pt-4">
      <p className="font-newfrank absolute right-0 top-[-15px] text-xl uppercase opacity-20">
        {role}
      </p>
      <h3 className="mb-1 text-center text-3xl font-bold">
        Welcome or <i className="opacity-50">Welcome Back</i>
      </h3>

      {/* Form */}
      <div className="flex w-full max-w-md flex-col justify-center gap-2 rounded-lg p-4 align-middle">
        {error && <p className="text-red-500">{error}</p>}

        <form className="space-y-5">
          <div>
            <label htmlFor="login_email" className="block font-bold text-white">
              Email:
            </label>
            <input
              type="email"
              id="login_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-slate-500 px-3 py-2 text-black focus:border-slate-700 focus:outline-none focus:ring-slate-700 sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="login_password"
              className="block font-bold text-white"
            >
              Password:
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle between text and password
                id="login_password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-500 px-3 py-2 text-black focus:border-slate-700 focus:outline-none focus:ring-slate-700 sm:text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex w-auto gap-2">
            {/* Register Button */}
            <button
              type="submit"
              onClick={handleRegisterSubmit}
              className="border-fiu-gold hover:bg-fiu-gold box-content flex w-44 cursor-pointer items-center justify-center gap-2 rounded-lg border-[3px] px-8 py-3 text-white transition-all duration-300 hover:border-[#8e7512] hover:font-bold"
            >
              Sign Up
            </button>

            {/* Login Button */}
            <button
              type="submit"
              onClick={handleLoginSubmit}
              className="border-fiu-gold hover:bg-fiu-gold box-content flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-[3px] px-8 py-3 text-white transition-all duration-300 hover:border-[#8e7512] hover:font-bold"
            >
              <span className="flex w-full items-center justify-center pr-5">
                Login
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
