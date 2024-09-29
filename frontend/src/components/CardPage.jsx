import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Schedule from "./Schedule.jsx";

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
    <div className="flex h-dvh w-full items-center justify-center border-2 align-middle">
      <div className="border-2 border-red-500 p-60">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <p>{course.duration}</p>
        <p>{course.instructor}</p>
      </div>
      <Schedule />
    </div>
  );
};

export default CardPage;
