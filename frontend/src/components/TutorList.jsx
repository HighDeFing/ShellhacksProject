import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TutorList = ({ courseTutorsId }) => {
  const [tutors, setTutors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/tutors/read")
      .then((response) => response.json())
      .then((data) => setTutors(data));
  }, []);

  const handleButtonClick = (id) => {
    navigate(`/tutor/${id}`);
  };

  // Ensure courseTutorsId is an array
  const courseTutorIdsArray = Array.isArray(courseTutorsId)
    ? courseTutorsId
    : courseTutorsId.split(",").map(Number);

  // Filter tutors whose `id` matches any value in the courseTutorIdsArray
  const filteredTutors = tutors.filter((tutor) =>
    courseTutorIdsArray.includes(tutor.id)
  );

  return (
    <div>
      <h1>Tutors</h1>
      <ul>
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <div className="border-2" key={tutor._id}>
              <li>{tutor.name}</li>
              <li>{tutor.email}</li>
              <li>{tutor.phone}</li>
              <button onClick={() => handleButtonClick(tutor._id)}>
                Pick Me!
              </button>
            </div>
          ))
        ) : (
          <p>No tutors available for this course.</p>
        )}
      </ul>
    </div>
  );
};

export default TutorList;
