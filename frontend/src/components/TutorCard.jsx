import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Schedule from "./Schedule.jsx";

const TutorCard = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/tutors/read/${id}`)
      .then((response) => response.json())
      .then((data) => setTutor(data));
  }, [id]);

  console.log(tutor);

  if (!tutor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card h-60 w-48 rounded-md border-2 border-black p-4">
      <h5 className="font-bold">{tutor.name}</h5>
      <p>Phone: {tutor.phone}</p>
      <p>Gender: {tutor.gender}</p>
      <p>Subjects: {tutor.subjects.join(", ")}</p>
      <div>
        <Schedule></Schedule>
      </div>
    </div>
  );
};

export default TutorCard;
