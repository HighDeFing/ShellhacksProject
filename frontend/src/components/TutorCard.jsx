import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import Cookies from "js-cookie";

const TutorCard = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("courseId");

    const [tutor, setTutor] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [student, setStudent] = useState(null);

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

        const fetchStudentData = async () => {
            const sessionId = Cookies.get("sessionId");
            if (sessionId) {
                setIsLoggedIn(true);
                try {
                    const response = await fetch(`http://localhost:3000/api/students/read/${sessionId}`);
                    const data = await response.json();
                    setStudent(data);
                } catch (error) {
                    console.error("Error fetching student data:", error);
                }
            }
        };

        fetchTutorData();
        fetchStudentData();
    }, [id]);

    const handleScheduleChange = (event) => {
        setSelectedSchedule(event.target.value);
    };

    const handleSubmit = async () => {
    if (!isLoggedIn) {
        alert("You must be logged in to schedule an appointment.");
        return;
    }

    if (selectedSchedule && student) {
        const newAppointmentForStudent = {
            date: selectedSchedule,
            tutor_id: tutor._id, // Ensure this is the correct ID
            courses: courseId, // Ensure this is the correct ID
            subject: tutor.subject
        };

        const newAppointmentForTutor = {
            date: selectedSchedule,
            student_id: student._id, // Ensure this is the correct ID
            courses: courseId, // Ensure this is the correct ID
            subject: tutor.subject
        };

        const updatedStudentAppointments = [...student.appointments, newAppointmentForStudent];
        const updatedTutorAppointments = [...tutor.appointments, newAppointmentForTutor];

        // Update schedule_available and schedule_taken
        const updatedScheduleAvailable = tutor.schedule_available.filter(day => day !== selectedSchedule);
        const updatedScheduleTaken = [...tutor.schedule_taken, selectedSchedule];

        const { _id, ...studentWithoutId } = student; // Exclude _id from the student object
        const updatedStudent = { ...studentWithoutId, appointments: updatedStudentAppointments };

        const { _id: tutorId, ...tutorWithoutId } = tutor; // Exclude _id from the tutor object
        const updatedTutor = {
            ...tutorWithoutId,
            appointments: updatedTutorAppointments,
            schedule_available: updatedScheduleAvailable,
            schedule_taken: updatedScheduleTaken
        };

        try {
            const studentResponse = await fetch(`http://localhost:3000/api/students/update/${student._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedStudent)
            });

            const tutorResponse = await fetch(`http://localhost:3000/api/tutors/update/${tutorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedTutor)
            });

            if (studentResponse.ok && tutorResponse.ok) {
                setStudent(updatedStudent);
                setTutor(updatedTutor);
                alert(`Appointment scheduled on ${selectedSchedule}`);
            } else {
                const studentErrorData = await studentResponse.json();
                const tutorErrorData = await tutorResponse.json();
                console.error("Failed to update student appointments:", studentErrorData);
                console.error("Failed to update tutor appointments:", tutorErrorData);
                alert("Failed to update appointments.");
            }
        } catch (error) {
            console.error("Error updating appointments:", error);
            alert("Error updating appointments.");
        }
    } else {
        alert("Please select a day.");
    }
};

    if (!tutor) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex h-auto w-full items-center justify-center py-10">
            <div className="flex h-full w-full max-w-screen-2xl rounded-lg border-2 border-gray-300 bg-white shadow-lg">
                <div className="w-1/2 p-8">
                    <div className="mb-4 flex items-center">
                        <Link to="/" className="mr-3">
                            <IoMdExit className="text-3xl text-gray-600 hover:text-gray-800" />
                        </Link>
                        <h1 className="text-5xl font-bold text-gray-800">{tutor.name}</h1>
                    </div>
                    <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm">
                        <p className="text-lg text-gray-600">Email: {tutor.email}</p>
                        <p className="text-lg text-gray-600">Phone: {tutor.phone}</p>
                        <p className="text-lg text-gray-600">Gender: {tutor.gender}</p>
                        <p className="text-lg text-gray-600">Role: {tutor.role}</p>
                        <p className="text-lg text-gray-600">Available Schedule:</p>
                        <select
                            value={selectedSchedule}
                            onChange={handleScheduleChange}
                            className="mt-2 w-full rounded-md border border-gray-300 p-2"
                        >
                            <option value="">--Select a day--</option>
                            {Array.isArray(tutor.schedule_available) ? tutor.schedule_available.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            )) : null}
                        </select>
                        <button
                            onClick={handleSubmit}
                            className="mt-4 w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
                        >
                            Confirm Appointment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorCard;