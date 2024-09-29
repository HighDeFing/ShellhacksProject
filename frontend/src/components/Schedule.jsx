import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Schedule = ({ tutorId }) => {
    const [selectedDay, setSelectedDay] = useState("");
    const [scheduleAvailable, setScheduleAvailable] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/api/tutor/read/${tutorId}`)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data.schedule_available)) {
                    setScheduleAvailable(data.schedule_available);
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [tutorId]);

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedDay) {
            alert(`Appointment scheduled on ${selectedDay}`);
        } else {
            alert("Please select a day.");
        }
    };

    return (
        <div className="schedule-container">
            <h2>Schedule an Appointment</h2>
            <div className="day-selector">
                <label htmlFor="day">Select a day:</label>
                <select id="day" value={selectedDay} onChange={handleDayChange}>
                    <option value="">--Select a day--</option>
                    {scheduleAvailable.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
            </div>
            <div className="schedule-available">
                <h3>Available Schedule:</h3>
                <ul>
                    {scheduleAvailable.map((day) => (
                        <li key={day}>{day}</li>
                    ))}
                </ul>
            </div>
            <button onClick={handleSubmit}>Confirm Appointment</button>
        </div>
    );
};

Schedule.propTypes = {
    tutorId: PropTypes.string.isRequired,
};

export default Schedule;