import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import CourseSelection from "./CourseSelection.jsx";
import { useState, useEffect } from "react";

const CardContainer = () => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/courses/read")
      .then((response) => response.json())
      .then((data) => setCourse(data));
  }, []);

  return (
    <div className="flex h-auto w-full justify-center">
      <div className="w-full max-w-screen-lg border-2">
        <SubjectSelection />
        {/* Change to Grid to allow 3 per row */}
        <div className="grid w-full grid-cols-3 place-content-center gap-8 border-2 px-20">
          {course.map((course) => (
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
