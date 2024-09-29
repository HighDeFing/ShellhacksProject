import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Schedule = ({ tutorId }) => {
    const [scheduleAvailable, setScheduleAvailable] = useState([]);
    const [tutorInfo, setTutorInfo] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/api/tutors/read/${tutorId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setTutorInfo(data);
                    if (Array.isArray(data.schedule_available)) {
                        setScheduleAvailable(data.schedule_available);
                    }
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [tutorId]);

    return (
        <div className="schedule-container">
            {tutorInfo && (
                <div className="tutor-info">
                    <h3>Tutor Information</h3>
                    <p>Name: {tutorInfo.name}</p>
                    <p>Email: {tutorInfo.email}</p>
                    <p>Phone: {tutorInfo.phone}</p>
                </div>
            )}
            <div className="schedule-available">
                <h3>Available Schedule:</h3>
                {scheduleAvailable.map((day, index) => (
                    <span key={index}>{day}{index < scheduleAvailable.length - 1 ? ', ' : ''}</span>
                ))}
            </div>
        </div>
    );
};

Schedule.propTypes = {
    tutorId: PropTypes.string.isRequired,
};

export default Schedule;