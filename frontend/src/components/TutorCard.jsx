import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";

const TutorCard = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState("");

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/tutors/read/${id}`
        );
        const data = await response.json();
        setTutor(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTutorData();
  }, [id]);

  const handleScheduleChange = (event) => {
    setSelectedSchedule(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedSchedule) {
      const updatedScheduleAvailable = tutor.schedule_available.filter(
        (day) => day !== selectedSchedule
      );
      const updatedScheduleTaken = [...tutor.schedule_taken, selectedSchedule];

      // Create a copy of the tutor object without the _id field
      const { _id, ...tutorWithoutId } = tutor;
      const updatedTutor = {
        ...tutorWithoutId,
        schedule_available: updatedScheduleAvailable,
        schedule_taken: updatedScheduleTaken,
      };

      try {
        const response = await fetch(
          `http://localhost:3000/api/tutors/update/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTutor),
          }
        );

        if (response.ok) {
          setTutor(updatedTutor);
          alert(`Appointment scheduled on ${selectedSchedule}`);
        } else {
          alert("Failed to update schedule.");
        }
      } catch (error) {
        console.error("Error updating schedule:", error);
        alert("Error updating schedule.");
      }
    } else {
      alert("Please select a day.");
    }
  };

  if (!tutor) {
    return (
      <div className="mt-72 flex h-auto w-full items-center justify-center py-10">
        <p className="font-newfrank animate-pulse text-9xl font-extrabold text-gray-500">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-auto w-full items-center justify-center py-10">
      <div className="relative flex h-full w-1/2 max-w-screen-2xl rounded-lg border-2 border-gray-300 bg-white shadow-lg">
        {/* Left Section */}
        <div className="w-full p-8">
          <div className="mb-4 flex items-center">
            <Link to="/" className="mr-3">
              <IoMdExit className="text-3xl text-gray-600 hover:text-gray-800" />
            </Link>
            <h1 className="px-5 text-5xl font-bold text-gray-800">
              {tutor.name}
            </h1>
          </div>
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <h2 className="font-newfrank mb-4 text-2xl font-semibold text-gray-700">
              Tutor Details
            </h2>
            <p className="text-lg text-gray-600">Email: {tutor.email}</p>
            <p className="text-lg text-gray-600">Phone: {tutor.phone}</p>
            <p className="text-lg text-gray-600">Gender: {tutor.gender}</p>
            <p className="text-lg text-gray-600">Role: {tutor.role}</p>
          </div>

          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <p className="font-newfrank mb-4 text-2xl font-semibold text-gray-700">
              Available Schedule:
            </p>
            <div className="flex items-center justify-center gap-2">
              <select
                value={selectedSchedule}
                onChange={handleScheduleChange}
                className="flex h-14 w-full items-center justify-center rounded-md border border-gray-300 p-2"
              >
                <option value="">--Select a day--</option>
                {Array.isArray(tutor.schedule_available)
                  ? tutor.schedule_available.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))
                  : null}
              </select>
              <button
                onClick={handleSubmit}
                className="font-newfrank flex h-[59px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white bg-green-500 px-14 py-5 font-semibold text-white transition-colors duration-300 hover:bg-green-700"
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
