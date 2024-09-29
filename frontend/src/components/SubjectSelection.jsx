import React from "react";
import {
  FaCalculator,
  FaFlask,
  FaLaptopCode,
  FaHeartbeat,
  FaDraftingCompass,
} from "react-icons/fa";

const SubjectSelection = ({ setSelectedSubject }) => {
  // Map the courses to their corresponding icons and colors
  const subjects = [
    {
      name: "Mathematics",
      icon: FaCalculator,
      bgColor: "bg-green-500",
      hoverColor: "hover:bg-green-700",
    },
    {
      name: "Chemistry",
      icon: FaFlask,
      bgColor: "bg-yellow-500",
      hoverColor: "hover:bg-yellow-700",
    },
    {
      name: "Computer Science",
      icon: FaLaptopCode,
      bgColor: "bg-blue-500",
      hoverColor: "hover:bg-blue-700",
    },
    {
      name: "Health",
      icon: FaHeartbeat,
      bgColor: "bg-red-500",
      hoverColor: "hover:bg-red-700",
    },
    {
      name: "Architecture",
      icon: FaDraftingCompass,
      bgColor: "bg-purple-500",
      hoverColor: "hover:bg-purple-700",
    },
  ];

  return (
    <div className="flex w-full items-center justify-center space-x-3 py-5">
      {/* Reset Button */}
      <div
        onClick={() => {
          console.log("Reset filter");
          setSelectedSubject(null); // Reset the selected subject
        }}
        className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 border-black bg-gray-500 p-3 px-14 text-white transition-colors duration-300 hover:bg-gray-700`}
      >
        <span className="font-newfrank text-lg font-normal">Reset Filter</span>
      </div>

      {subjects.map((subject) => (
        <div
          key={subject.name}
          onClick={() => {
            console.log(`Selected subject: ${subject.name}`);
            setSelectedSubject(subject.name); // Set the selected subject
          }}
          className={`course-tag flex cursor-pointer items-center gap-2 rounded-lg border-2 border-black p-3 px-7 text-white ${subject.bgColor} ${subject.hoverColor} transition-colors duration-300`}
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
