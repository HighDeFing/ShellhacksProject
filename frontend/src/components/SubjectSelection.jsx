import React from "react";
import {
  FaCalculator,
  FaFlask,
  FaLaptopCode,
  FaHeartbeat,
  FaDraftingCompass,
} from "react-icons/fa";

const SubjectSelection = () => {
  // Map the subjects to their corresponding icons
  const subjects = [
    { name: "Mathematics", icon: FaCalculator },
    { name: "Chemistry", icon: FaFlask },
    { name: "Computer Science", icon: FaLaptopCode },
    { name: "Health", icon: FaHeartbeat },
    { name: "Architecture", icon: FaDraftingCompass },
  ];

  return (
    <div className="flex w-full items-center justify-center space-x-4 py-5">
      {subjects.map((subject) => (
        <div
          key={subject.name}
          className="course-tag flex items-center gap-2 rounded-lg border-2 border-black p-3"
        >
          <subject.icon className="text-2xl" /> {/* Icon size */}
          <span className="text-lg font-medium">{subject.name}</span>{" "}
          {/* Subject text */}
        </div>
      ))}
    </div>
  );
};

export default SubjectSelection;
