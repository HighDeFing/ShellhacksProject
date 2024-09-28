import { useState, useEffect } from "react";

const TutorList = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/teachers/read")
      .then((response) => response.json())
      .then((data) => setTutors(data));
  }, []);

  console.log(tutors);

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
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TutorList;
