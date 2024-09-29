import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import SubjectSelection from "./SubjectSelection";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const CardContainer = ({ searchQuery }) => {
  const [courses, setCourses] = useState([]); // Stores all courses
  const [selectedSubject, setSelectedSubject] = useState(null); // Stores the selected subject
  const [authToken, setAuthToken] = useState(null); // Track user authentication
  const [popupMessage, setPopupMessage] = useState(""); // Track if the popup should show

  // Check for authentication when component loads
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/courses/read")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  // Handle clicking on course card
  const handleCourseClick = (e) => {
    if (!authToken) {
      e.preventDefault(); // Prevent navigating to the course page
      setPopupMessage("You must sign up or login first!"); // Show popup message
    }
  };

  // Filter the courses by selected subject and search query
  const filteredCourses = courses.filter((course) => {
    const matchesSubject = selectedSubject
      ? course.subject === selectedSubject
      : true;
    const matchesQuery = course.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSubject && matchesQuery;
  });

  return (
    <div className="flex h-auto w-full flex-col justify-center">
      <div className="w-full">
        {/* Pass the subject selection handler */}
        <SubjectSelection setSelectedSubject={setSelectedSubject} />
      </div>
      {popupMessage && (
        <div className="mb-4 rounded-lg bg-red-500 p-4 text-center text-white">
          {popupMessage}
        </div>
      )}

      <div className="mx-auto w-full max-w-screen-xl">
        {/* Display popup message if user isn't authenticated */}

        {/* Check if no courses or if there are few results */}
        {filteredCourses.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center">
            <FaSearch className="mr-2 text-6xl text-gray-400" />
            <p className="font-newfrank mt-4 text-xl font-bold uppercase text-gray-600">
              No Results Found
            </p>
            <p className="font-newfrank mt-1 text-sm font-light text-gray-600">
              Please try another query
            </p>
          </div>
        ) : (
          <div className="grid min-h-[400px] w-full grid-cols-5 place-content-center gap-6 px-1 pb-7 pt-7">
            {filteredCourses.map((course) => (
              <Link
                to={`/course/${course._id}`}
                key={course._id}
                onClick={handleCourseClick} // Prevent access if not authenticated
              >
                <CourseCard
                  className="flex w-full items-center justify-center"
                  course={course}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardContainer;
