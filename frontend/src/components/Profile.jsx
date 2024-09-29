// Profile.jsx
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Appointments from "./Appointments";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const sessionId = Cookies.get("sessionId");
      console.log("Session ID from cookies:", sessionId); // Log the sessionId

      // Try to fetch data from students endpoint
      let response = await fetch(
        `http://localhost:3000/api/students/read/${sessionId}`,
        {
          headers: {
            "Session-Id": sessionId,
          },
        }
      );

      if (response.status === 404) {
        // If students data returns 404, fetch from tutors endpoint
        response = await fetch(
          `http://localhost:3000/api/tutors/read/${sessionId}`,
          {
            headers: {
              "Session-Id": sessionId,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tutors data");
        }
      } else if (!response.ok) {
        throw new Error("Failed to fetch students data");
      }

      const data = await response.json();
      console.log("API response:", data); // Log the API response
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div className="mt-72 flex h-auto w-full items-center justify-center py-10">
        <p className="animate-pulse font-newfrank text-9xl font-extrabold text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-auto w-full items-center justify-center py-10">
      <div className="flex h-full w-3/4 max-w-screen-2xl rounded-lg border-2 border-gray-300 bg-white shadow-lg">
        {/* Left Section */}
        <div className="w-1/2 p-8">
          <div className="mb-4 flex items-center">
            <img
              src={userData.picture}
              alt={userData.name}
              className="mr-6 h-24 w-24 rounded-full border-4 object-cover"
            />
            <div>
              <h1 className="text-5xl font-bold text-gray-800">
                {userData.name}
              </h1>
              <div className="flex items-center justify-center gap-2">
                <p className="text-sm text-gray-500">{userData.email}</p>
                <p className="text-sm text-gray-500">{userData.phone}</p>
                <p className="text-sm text-gray-500">
                  Gender: {userData.gender}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <h2 className="mb-4 font-newfrank text-2xl font-semibold text-gray-700">
              Enrolled Courses
            </h2>
            <ul className="list-disc pl-5">
              {userData.courses?.map((course, index) => (
                <li key={index} className="text-lg text-gray-600">
                  {course}
                </li>
              ))}
            </ul>
          </div>

          {/* Schedule Section */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <h2 className="mb-4 font-newfrank text-2xl font-semibold text-gray-700">
              Weekly Schedule
            </h2>
            <ul className="list-disc pl-5">
              {userData.schedule?.map((day, index) => (
                <li key={index} className="text-lg text-gray-600">
                  {day}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 border-l-2 border-gray-200">
          {/* Appointments Section */}
          <div className="h-full w-full">
            <Appointments
              role={userData.role}
              appointments={userData.appointments}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
