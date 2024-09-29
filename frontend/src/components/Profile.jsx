import { useState, useEffect } from "react";

const Profile = () => {
  const [authToken, setAuthToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve the stored token from localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      console.log("Token retrieved from localStorage:", token); // Debugging
    }

    // Simulate fetching user data (replace with actual API call)
    const mockUserData = {
      name: "Joshua Graham",
      email: "jg1911@gmail.com",
      phone: "+808-343-2087",
      gender: "Male",
      picture: "young-man-student-with-notebooks-showing-thumb-free-photo.jpg",
      courses: ["Mathematics I", "Physics II"],
      schedule: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      appointments: [
        {
          date: "Mon",
          tutor_id: 1,
          course: "Mathematics I",
          subject: "Math",
        },
      ],
    };
    setUserData(mockUserData);
  }, []);

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-auto w-full items-center justify-center py-10">
      <div className="flex h-full w-full max-w-screen-2xl rounded-lg border-2 border-gray-300 bg-white shadow-lg">
        {/* Left Section */}
        <div className="w-1/2 p-8">
          <div className="mb-4 flex items-center">
            <img
              src={userData.picture}
              alt={userData.name}
              className="mr-6 h-24 w-24 rounded-full object-cover"
            />
            <div>
              <h1 className="text-5xl font-bold text-gray-800">
                {userData.name}
              </h1>
              <p className="text-lg text-gray-500">{userData.email}</p>
              <p className="text-lg text-gray-500">{userData.phone}</p>
              <p className="text-lg text-gray-500">Gender: {userData.gender}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">
              Enrolled Courses
            </h2>
            <ul className="list-disc pl-5">
              {userData.courses.map((course, index) => (
                <li key={index} className="text-lg text-gray-600">
                  {course}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 border-l-2 border-gray-200 p-8">
          {/* Schedule Section */}
          <div className="mb-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">
              Weekly Schedule
            </h2>
            <ul className="list-disc pl-5">
              {userData.schedule.map((day, index) => (
                <li key={index} className="text-lg text-gray-600">
                  {day}
                </li>
              ))}
            </ul>
          </div>

          {/* Appointments Section */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">
              Appointments
            </h2>
            {userData.appointments.length > 0 ? (
              <ul className="list-disc pl-5">
                {userData.appointments.map((appointment, index) => (
                  <li key={index} className="text-lg text-gray-600">
                    {appointment.subject} on {appointment.date} with Tutor{" "}
                    {appointment.tutor_id} for {appointment.course}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg text-gray-600">
                No appointments scheduled.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
