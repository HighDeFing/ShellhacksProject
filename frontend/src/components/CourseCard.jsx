import { twMerge } from "tailwind-merge";

const CourseCard = ({ subject, className }) => {
  return (
    <div className={twMerge("card h-60 rounded-md", className)}>
      <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-black align-middle">
        <h5>{subject.name}</h5>
        <p>{subject.tutors_id}</p>
        <p>View Tutors</p>
      </div>
    </div>
  );
};

export default CourseCard;
