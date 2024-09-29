import { twMerge } from "tailwind-merge";

const CourseCard = ({ course: course, className }) => {
  return (
    <div className={twMerge("card h-48 rounded-md", className)}>
      <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-black align-middle">
        <h5>{course.name}</h5>
        {/* <p>{course.description}</p> */}
        <p>View Tutors</p>
      </div>
    </div>
  );
};

export default CourseCard;
