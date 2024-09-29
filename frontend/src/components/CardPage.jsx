import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Schedule from "./Schedule.jsx";
import { IoMdExit } from "react-icons/io";
import TutorList from "./TutorList.jsx";

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

  console.log(course);

  return (
    <div className="flex h-dvh w-full items-center justify-center pb-40 align-middle">
      <div className="flex h-3/4 w-1/2 border-2 border-red-500">
        <div className="flex w-1/2 flex-col border-2 border-green-500">
          <div className="flex h-16 flex-row items-center justify-start border-2 border-blue-600">
            <Link to="/">
              <IoMdExit className="mx-3 size-10" />
            </Link>
            <h1 className="text-4xl">{course.name}</h1>
          </div>
          <div>
            <p>{course.description}</p>
            <p>{course.tutors_id}</p>
            <p>{course.image_url}</p>
          </div>
        </div>
        <div className="w-1/2 border-2 border-red-400">
          <TutorList courseTutorsId={course.tutors_id} />
        </div>
        {/* Tutor Info */}
        {/* <Schedule /> */}
      </div>
    </div>
  );
};

export default CardPage;
