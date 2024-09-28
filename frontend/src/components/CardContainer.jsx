import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import SubjectSelection from "./SubjectSelection";
import { useState, useEffect } from "react";

const CardContainer = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/subjects/read")
      .then((response) => response.json())
      .then((data) => setSubjects(data));
  }, []);

  return (
    <div className="flex h-auto w-full justify-center">
      <div className="w-full max-w-screen-lg border-2">
        <SubjectSelection />
        {/* Change to Grid to allow 3 per row */}
        <div className="grid w-full grid-cols-3 place-content-center gap-8 border-2 px-20">
          {subjects.map((subject) => (
            <Link to={`/course/${subject._id}`} key={subject._id}>
              <CourseCard
                className="flex w-full items-center justify-center border-2"
                subject={subject}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardContainer;
