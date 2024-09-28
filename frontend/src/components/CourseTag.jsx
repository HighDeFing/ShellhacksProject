const CourseTag = ({ subject }) => {
  return (
    <div className="flex h-12 w-40 items-center justify-center rounded-md border-2 border-black">
      <h1>{subject}</h1>
    </div>
  );
};

export default CourseTag;
