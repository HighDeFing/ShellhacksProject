import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Schedule from "./Schedule.jsx";
import { IoMdExit } from "react-icons/io";

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
    <div className="flex h-dvh w-full items-center justify-center align-middle">
      <div className="flex w-auto flex-col border-2 border-red-500 p-60">
        {/* Title Portion */}
        <div className="flex w-full items-center justify-start border-2">
          <IoMdExit className="size-6" />
          <h1 className="border-2">{course.name}</h1>
        </div>
        <p>{course.description}</p>
        <p>{course.tutors_id}</p>
        <p>{course.image_url}</p>
        {/* Tutor Info */}
        <div></div>
        <Schedule />
      </div>
    </div>
  );
};

export default CardPage;
