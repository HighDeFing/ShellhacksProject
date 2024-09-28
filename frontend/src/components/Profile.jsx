import { useState, useEffect } from "react";

const Profile = () => {
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
    <div className="flex h-screen w-auto flex-col items-center justify-center border-2">
      <h1 className="text-5xl">Profile</h1>
      <p className="w-1/2 overflow-hidden overflow-ellipsis whitespace-nowrap text-wrap border-2 text-2xl">
        Your token is: {authToken}
      </p>
    </div>
  );
};

export default Profile;
