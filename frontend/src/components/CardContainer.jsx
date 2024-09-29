import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import SubjectSelection from "./SubjectSelection";
import { useState, useEffect } from "react";

const CardContainer = () => {
  const [courses, setCourses] = useState([]); // Stores all courses
  const [selectedSubject, setSelectedSubject] = useState(null); // Stores the selected subject

  useEffect(() => {
    fetch("http://localhost:3000/api/courses/read")
      .then((response) => response.json())
      .then((data) => {
        console.log("Course object:", data); // Log the course object
        setCourses(data);
      });
  }, []);

  // Filter the courses by selected subject
  const filteredCourses = selectedSubject
    ? courses.filter((course) => course.subject === selectedSubject)
    : courses; // If no subject is selected, show all courses

  return (
    <div className="flex h-auto w-full justify-center">
      <div className="w-full max-w-screen-2xl border-4">
        {/* Pass the subject selection handler */}
        <SubjectSelection setSelectedSubject={setSelectedSubject} />

        {/* Grid for displaying course cards */}
        <div className="grid w-full grid-cols-5 place-content-center gap-6 border-2 px-1 pt-5">
          {filteredCourses.map((course) => (
            <Link to={`/course/${course._id}`} key={course._id}>
              <CourseCard
                className="flex w-full items-center justify-center border-2"
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
