import React from "react";
import {
  FaCalculator,
  FaFlask,
  FaLaptopCode,
  FaHeartbeat,
  FaDraftingCompass,
} from "react-icons/fa";

const CourseSelection = () => {
  // Map the courses to their corresponding icons
  const courses = [
    { name: "Mathematics", icon: FaCalculator },
    { name: "Chemistry", icon: FaFlask },
    { name: "Computer Science", icon: FaLaptopCode },
    { name: "Health", icon: FaHeartbeat },
    { name: "Architecture", icon: FaDraftingCompass },
  ];

  return (
    <div className="flex w-full items-center justify-center space-x-4 pb-5 pt-14">
      {courses.map((course) => (
        <div
          key={course.name}
          className="course-tag flex items-center gap-2 rounded-lg border-2 border-black p-3"
        >
          <course.icon className="text-2xl" /> {/* Icon size */}
          <span className="text-lg font-medium">{course.name}</span>{" "}
          {/* Subject text */}
        </div>
      ))}
    </div>
  );
};

export default CourseSelection;
