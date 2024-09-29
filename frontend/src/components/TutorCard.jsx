import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Schedule from "./Schedule.jsx";

const TutorCard = () => {
    const { id } = useParams();
    const [tutor, setTutor] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState("");

    useEffect(() => {
        const fetchTutorData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/tutors/read/${id}`);
                const data = await response.json();
                setTutor(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTutorData();
    }, [id]);

    const handleScheduleChange = (event) => {
        setSelectedSchedule(event.target.value);
    };

    const handleSubmit = async () => {
        if (selectedSchedule) {
            const updatedScheduleAvailable = tutor.schedule_available.filter(day => day !== selectedSchedule);
            const updatedScheduleTaken = [...tutor.schedule_taken, selectedSchedule];

            // Create a copy of the tutor object without the _id field
            const { _id, ...tutorWithoutId } = tutor;
            const updatedTutor = { ...tutorWithoutId, schedule_available: updatedScheduleAvailable, schedule_taken: updatedScheduleTaken };

            try {
                const response = await fetch(`http://localhost:3000/api/tutors/update/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedTutor)
                });

                if (response.ok) {
                    setTutor(updatedTutor);
                    alert(`Appointment scheduled on ${selectedSchedule}`);
                } else {
                    alert("Failed to update schedule.");
                }
            } catch (error) {
                console.error("Error updating schedule:", error);
                alert("Error updating schedule.");
            }
        } else {
            alert("Please select a day.");
        }
    };

    if (!tutor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card h-60 w-48 rounded-md border-2 border-black p-4">
            <h5 className="font-bold">{tutor.name}</h5>
            <p>Email: {tutor.email}</p>
            <p>Phone: {tutor.phone}</p>
            <p>Gender: {tutor.gender}</p>
            <p>Role: {tutor.role}</p>
            <p>Available Schedule:</p>
            <select value={selectedSchedule} onChange={handleScheduleChange}>
                <option value="">--Select a day--</option>
                {Array.isArray(tutor.schedule_available) ? tutor.schedule_available.map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                )) : null}
            </select>
            <button onClick={handleSubmit}>Confirm Appointment</button>
        </div>
    );
};

export default TutorCard;