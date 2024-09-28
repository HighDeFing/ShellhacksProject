import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import SubjectSelection from "./SubjectSelection";

const CardContainer = () => {
  return (
    <div className="h-auto w-full">
      <SubjectSelection />
      {/* Change to Grid to allow 4 per row */}
      <div className="flex w-full flex-wrap justify-center space-x-8">
        <Link to="/course">
          <CourseCard className="basis-1/4" />
        </Link>
        <CourseCard className="basis-1/4" />
        <CourseCard className="basis-1/4" />
        <CourseCard className="basis-1/4" />
      </div>
    </div>
  );
};

export default CardContainer;
