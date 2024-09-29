const HeroSection = () => {
  return (
    <div className="mx-auto flex h-auto w-auto max-w-screen-xl items-center justify-between py-7">
      {/* Left section with text */}
      <div className="flex w-1/2 flex-col justify-center px-8">
        <h1 className="font-newfrank text-4xl font-bold text-gray-900">
          Bridging Students and Tutors
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          TutorFinder is your go-to platform to connect struggling students with
          knowledgeable tutors. Whether you need help mastering a tough subject
          or want to improve your skills, our tutors are here to guide you.
          Unlock your potential and take your learning to the next level.
        </p>
      </div>

      {/* Right section with smaller stock image */}
      <div className="w-7/12 px-6">
        <img
          src="https://blog.mimio.com/hubfs/Google%20Workspace%20blog.png" // Replace this with an actual appealing stock image URL
          alt="Students working together"
          className="border-fiu-blue h-auto w-full rounded-lg border-4 object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
