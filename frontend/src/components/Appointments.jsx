// Appointments.jsx
import React from 'react';

const Appointments = ({ role, appointments }) => {
    return (
        <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">
                Appointments
            </h2>
            {appointments?.length > 0 ? (
                <ul className="list-disc pl-5">
                    {appointments.map((appointment, index) => (
                        <li key={index} className="text-lg text-gray-600">
                            {role === "student" ? (
                                <>
                                    {appointment.subject} on {appointment.date} with Tutor{" "}
                                    {appointment.tutor_id} for {appointment.courses}
                                </>
                            ) : (
                                <>
                                    {appointment.subject} on {appointment.date} with Student{" "}
                                    {appointment.student_id} for {appointment.courses}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-lg text-gray-600">
                    No appointments scheduled.
                </p>
            )}
        </div>
    );
};

export default Appointments;