import React, { useState, useEffect } from "react";

const Appointments = ({ role, appointments }) => {
  const [tutors, setTutors] = useState({});
  const [courses, setCourses] = useState({});
  const [students, setStudents] = useState({});

  const fetchTutorDetails = async (tutorId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tutors/readeasy/${tutorId}`
      );
      if (response.ok) {
        const data = await response.json();
        setTutors((prevTutors) => ({ ...prevTutors, [tutorId]: data }));
      } else {
        console.error(`Failed to fetch tutor with ID ${tutorId}`);
      }
    } catch (error) {
      console.error(`Error fetching tutor with ID ${tutorId}:`, error);
    }
  };

  const fetchCourseDetails = async (courseId) => {
    try {
      let response = await fetch(
        `http://localhost:3000/api/courses/readeasy/${courseId}`
      );
      if (response.status === 404) {
        response = await fetch(
          `http://localhost:3000/api/courses/read/${courseId}`
        );
      }
      if (response.ok) {
        const data = await response.json();
        setCourses((prevCourses) => ({ ...prevCourses, [courseId]: data }));
      } else {
        console.error(`Failed to fetch course with ID ${courseId}`);
      }
    } catch (error) {
      console.error(`Error fetching course with ID ${courseId}:`, error);
    }
  };

  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/read/${studentId}`
      );
      if (response.ok) {
        const data = await response.json();
        setStudents((prevStudents) => ({ ...prevStudents, [studentId]: data }));
      } else {
        console.error(`Failed to fetch student with ID ${studentId}`);
      }
    } catch (error) {
      console.error(`Error fetching student with ID ${studentId}:`, error);
    }
  };

  useEffect(() => {
    appointments.forEach((appointment) => {
      if (!tutors[appointment.tutor_id]) {
        fetchTutorDetails(appointment.tutor_id);
      }
      if (!courses[appointment.courses]) {
        fetchCourseDetails(appointment.courses);
      }
      if (!students[appointment.student_id]) {
        fetchStudentDetails(appointment.student_id);
      }
    });
  }, [appointments]);

  return (
    <div>
      <div className="flex h-28 w-full items-center justify-center border-b-4 border-black bg-fiu-blue">
        <h1 className="flex w-full justify-start px-4 py-12 font-newfrank text-4xl font-normal text-white">
          Appointments
        </h1>
      </div>
      {appointments?.length > 0 ? (
        <ul className="list-disc pl-5">
          {appointments.map((appointment, index) => (
            <li key={index} className="text-lg text-gray-600">
              {role === "student" ? (
                <>
                  <strong>Subject:</strong> {appointment.subject} <br />
                  <strong>Date:</strong> {appointment.date} <br />
                  <strong>Tutor:</strong>{" "}
                  {tutors[appointment.tutor_id]?.name || "Loading..."} <br />
                  <strong>Course:</strong>{" "}
                  {courses[appointment.courses]?.name || "Loading..."}
                </>
              ) : (
                <>
                  <strong>Subject:</strong> {appointment.subject} <br />
                  <strong>Date:</strong> {appointment.date} <br />
                  <strong>Student:</strong>{" "}
                  {students[appointment.student_id]?.name || "Loading..."}{" "}
                  <br />
                  <strong>Course:</strong>{" "}
                  {courses[appointment.courses]?.name || "Loading..."}
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
