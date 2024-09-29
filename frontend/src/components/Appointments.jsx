// Appointments.jsx
import React from "react";

const Appointments = ({ role, appointments }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="bg-fiu-blue flex h-24 w-full items-center justify-center border-b-4 border-black">
        <h1 className="font-newfrank flex w-full justify-start px-4 py-6 text-4xl font-normal text-white">
          Appointments
        </h1>
      </div>

      {appointments?.length > 0 ? (
        <ul className="mt-5 list-disc px-10">
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
        <p className="text-lg text-gray-600">No appointments scheduled.</p>
      )}
    </div>
  );
};

export default Appointments;
