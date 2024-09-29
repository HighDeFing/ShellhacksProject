import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    : courseTutorsId?.split(",").map(Number);

  // Filter tutors whose `id` matches any value in the courseTutorIdsArray
  const filteredTutors = tutors.filter((tutor) =>
    courseTutorIdsArray?.includes(tutor.id)
  );

  return (
    <div>
      <div className="bg-fiu-blue flex h-24 w-full items-center justify-center border-b-4 border-black">
        <h1 className="font-newfrank flex w-full justify-start px-4 py-6 text-4xl font-normal text-white">
          Select a Tutor Below
        </h1>
      </div>
      <ul className="w-full">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((tutor) => (
            <Link to={`/tutor/${tutor._id}`} key={tutor._id}>
              <div
                className="flex h-20 w-full items-center justify-start space-x-4 border-b-2 pl-5"
                key={tutor._id}
              >
                <li className="size-12 border-2">{tutor.image_url}</li>
                <li className="font-newfrank w-[15ch] font-bold">
                  {tutor.name}
                </li>
                <li className="font-newfrank font-light">{tutor.email}</li>
              </div>
            </Link>
          ))
        ) : (
          <p>No tutors available for this course.</p>
        )}
      </ul>
    </div>
  );
};

export default TutorList;
