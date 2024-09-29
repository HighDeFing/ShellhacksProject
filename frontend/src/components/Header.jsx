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

  // Handle user logout
  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("authToken");
    // Update the authToken state to null
    setAuthToken(null);
    console.log("User logged out");
  };

  return (
    <div className="sticky top-0 mb-12 h-24 min-h-24 w-full border-b border-black border-opacity-5 bg-gray-50">
      <div className="flex h-full w-full items-center justify-between px-12">
        <Link to="/">
          <p className="text-5xl text-gray-500">
            <b>T</b>utor<b>F</b>inder
          </p>
        </Link>
        <div className="flex space-x-7">
          {/* Show token or "Not logged in" */}
          <p className="flex h-12 w-[15ch] items-center overflow-hidden text-ellipsis whitespace-nowrap border-2 text-sm">
            Token: {authToken ? authToken : "Not logged in"}
          </p>

          {/* If user is logged in, show logout on the left and profile on the right, otherwise show modals */}
          {authToken ? (
            <>
              {/* Logout button on the left */}
              <button
                onClick={handleLogout}
                className="flex h-12 items-center justify-center rounded-md border-2 border-black px-4 py-2 text-2xl hover:bg-red-600 hover:text-white"
              >
                Logout
              </button>

              {/* Profile button on the right */}
              <Link to="/profile">
                <button className="flex h-12 items-center justify-center rounded-md border-2 border-black px-4 py-2 text-2xl hover:bg-gray-700 hover:text-white">
                  Profile
                </button>
              </Link>
            </>
          ) : (
            <>
              <Modal role="student" buttonText="I am a Student" />
              <Modal role="tutor" buttonText="I am a Tutor" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
