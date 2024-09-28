import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState, useEffect } from "react";

const Header = () => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Retrieve the stored token from localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      console.log("Token retrieved from localStorage:", token); // Debugging
    }
  }, []);

  return (
    <div className="bg h-24 w-full border-b border-black border-opacity-5 bg-gray-50">
      <div className="flex h-full w-full items-center justify-between px-12">
        <Link to="/">
          <p className="text-5xl text-gray-500">
            <b>T</b>utor<b>F</b>inder
          </p>
        </Link>
        <div className="flex space-x-7">
          {/* Show token or "Not logged in" */}
          <p className="w-[15ch] overflow-hidden border-2">
            Logged in: {authToken ? authToken : "Not logged in"}
          </p>

          <Modal role="student" buttonText="I am a Student" />
          <Modal role="tutor" buttonText="I am a Tutor" />
        </div>
      </div>
    </div>
  );
};

export default Header;
