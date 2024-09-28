import CourseCard from "./CourseCard";
import CourseTag from "./CourseTag";

const CardContainer = () => {
  return (
    <div className="h-auto w-full">
      {/* CourseTag Container */}
      <div className="flex w-full items-center justify-center space-x-4 pb-5 pt-14">
        <CourseTag subject={"Mathematics"} />
        <CourseTag subject={"Chemistry"} />
        <CourseTag subject={"Computer Science"} />
        <CourseTag subject={"Health"} />
        <CourseTag subject={"Architecture"} />
      </div>
      {/* Change to Grid to allow 4 per row */}
      <div className="flex w-full flex-wrap justify-center space-x-8">
        <CourseCard className="basis-1/4" />
        <CourseCard className="basis-1/4" />
        <CourseCard className="basis-1/4" />
        <CourseCard className="basis-1/4" />
      </div>
    </div>
  );
};

export default CardContainer;
