import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Schedule from "./Schedule.jsx";

const TutorCard = () => {
    const { id } = useParams();
    const [teacher, setTeacher] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/teachers/read/${id}`)
            .then((response) => response.json())
            .then((data) => setTeacher(data));
    }, [id]);

    console.log(teacher);

    if (!teacher) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card h-60 w-48 rounded-md border-2 border-black p-4">
            <h5 className="font-bold">{teacher.name}</h5>
            <p>Phone: {teacher.phone}</p>
            <p>Gender: {teacher.gender}</p>
            <p>Subjects: {teacher.subjects.join(", ")}</p>
            <div>
                <Schedule>
                </Schedule>
            </div>
        </div>
    );
};

export default TutorCard;