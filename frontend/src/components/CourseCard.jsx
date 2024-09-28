const CourseCard = () => {
  return (
    <div className="card h-60 w-48 rounded-md">
      <div className="flex h-full flex-col items-center justify-center rounded-md border-2 border-black align-middle">
        <h5>Title</h5>
        <p>Description</p>
        <p>View Tutors</p>
      </div>
    </div>
  );
};

export default CourseCard;
