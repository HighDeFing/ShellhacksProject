import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TutorList = () => {
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

  return (
    <div>
      <h1>Tutors</h1>
      <ul>
        {tutors.map((tutor) => (
          <div className="border-2" key={tutor.id}>
            <li>{tutor.name}</li>
            <li>{tutor.phone}</li>
            <li>{tutor.gender}</li>
            <li>{tutor.subjects.join(", ")}</li>
            <button onClick={() => handleButtonClick(tutor._id)}>
              Pick Me!
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TutorList;
