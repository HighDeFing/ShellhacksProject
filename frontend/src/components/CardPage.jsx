import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Schedule from "./Schedule.jsx";
import { IoMdExit } from "react-icons/io";
import TutorList from "./TutorList.jsx";
// import TeamTable from "./TeamTable.jsx"; // If needed

const CardPage = () => {
  const { id } = useParams(); // Get the course id from the URL
  const [course, setCourse] = useState(null);

  // Fetch the course data using the course id
  useEffect(() => {
    fetch(`http://localhost:3000/api/courses/read/${id}`)
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.error("Error fetching course:", error));
  }, [id]);

  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-auto w-full items-center justify-center py-10">
      <div className="flex h-full w-full max-w-screen-xl rounded-lg border-2 border-gray-300 bg-white shadow-lg">
        {/* Left Section */}
        <div className="w-1/2 p-8">
          <div className="mb-4 flex items-center">
            <Link to="/" className="mr-3">
              <IoMdExit className="text-3xl text-gray-600 hover:text-gray-800" />
            </Link>
            <h1 className="text-5xl font-bold text-gray-800">{course.name}</h1>
          </div>
          {/* Image (if available) */}
          {course.image_url && (
            <img
              src={`/public/images/${course.image_url}`}
              alt={course.name}
              className="mb-6 h-64 w-full rounded-lg object-cover shadow-md"
            />
          )}
          {/* Course Description */}
          <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">
              Course Description
            </h2>
            <p className="text-lg leading-relaxed text-gray-600">
              {course.description}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/2 border-l-2 border-gray-200 p-8">
          {/* Tutor List */}
          <div className="mb-6">
            <TutorList courseTutorsId={course.tutors_id} />
          </div>
          {/* Optional: Add more content like a schedule, team table, etc. */}
          {/* <Schedule /> */}
        </div>
      </div>
    </div>
  );
};

export default CardPage;
