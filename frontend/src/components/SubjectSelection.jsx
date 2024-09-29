import React, { useState } from "react";
import {
  FaCalculator,
  FaFlask,
  FaLaptopCode,
  FaHeartbeat,
  FaDraftingCompass,
} from "react-icons/fa";

const SubjectSelection = ({ setSelectedSubject }) => {
  const [activeSubject, setActiveSubject] = useState(null);

  // Map the courses to their corresponding icons and colors
  const subjects = [
    {
      name: "Mathematics",
      icon: FaCalculator,
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-700",
      activeBorderColor: "border-green-700",
    },
    {
      name: "Chemistry",
      icon: FaFlask,
      bgColor: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-700",
      activeBorderColor: "border-yellow-700",
    },
    {
      name: "Computer Science",
      icon: FaLaptopCode,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-700",
      activeBorderColor: "border-blue-700",
    },
    {
      name: "Health",
      icon: FaHeartbeat,
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-700",
      activeBorderColor: "border-red-700",
    },
    {
      name: "Architecture",
      icon: FaDraftingCompass,
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-700",
      activeBorderColor: "border-purple-700",
    },
  ];

  return (
    <div className="bg-fiu-blue flex w-full items-center justify-center space-x-4 py-4">
      {/* Reset Button */}
      <div
        onClick={() => {
          console.log("Reset filter");
          setSelectedSubject(null); // Reset the selected subject
          setActiveSubject(null); // Reset the active subject
        }}
        className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-white bg-gray-500 p-3 px-14 text-white transition-colors duration-300 hover:bg-gray-700"
      >
        <span className="font-newfrank text-lg font-normal">Reset Filter</span>
      </div>

      {subjects.map((subject) => (
        <div
          key={subject.name}
          onClick={() => {
            console.log(`Selected subject: ${subject.name}`);
            setSelectedSubject(subject.name); // Set the selected subject
            setActiveSubject(subject.name); // Set the active subject
          }}
          className={`course-tag flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 px-7 text-white transition-colors duration-300 ${
            activeSubject === subject.name
              ? subject.activeBorderColor
              : "border-white"
          } ${subject.bgColor} ${subject.hoverColor}`}
        >
          <subject.icon className="text-2xl" />
          <span className="font-newfrank text-lg font-normal">
            {subject.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SubjectSelection;
