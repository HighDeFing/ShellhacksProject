import { useState } from "react";

const Schedule = () => {
    const [selectedDay, setSelectedDay] = useState("");

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

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
                    {daysOfWeek.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleSubmit}>Confirm Appointment</button>
        </div>
    );
};

export default Schedule;