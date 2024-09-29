import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import SubjectSelection from "./SubjectSelection";
import { useState, useEffect } from "react";

const CardContainer = ({ searchQuery }) => {
  const [courses, setCourses] = useState([]); // Stores all courses
  const [selectedSubject, setSelectedSubject] = useState(null); // Stores the selected subject

  useEffect(() => {
    fetch("http://localhost:3000/api/courses/read")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

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
      <div className="mx-auto w-full max-w-screen-xl">
        {/* Grid for displaying course cards */}
        <div className="grid w-full grid-cols-5 place-content-center gap-6 px-1 pt-5">
          {filteredCourses.map((course) => (
            <Link to={`/course/${course._id}`} key={course._id}>
              <CourseCard
                className="flex w-full items-center justify-center"
                course={course}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
