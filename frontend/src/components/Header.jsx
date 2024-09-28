const Header = () => {
  return (
    <div className="bg h-24 w-full border-b border-black border-opacity-5 bg-gray-50">
      <div className="flex h-full w-full items-center justify-between px-12">
        <p className="text-5xl text-gray-500">
          <b>T</b>utor<b>F</b>inder
        </p>
        <div className="flex space-x-7">
          <button className="flex h-12 items-center justify-center rounded-md border-2 border-black px-4 py-2 text-2xl hover:bg-gray-700 hover:text-white">
            I am a Student
          </button>
          <button className="flex h-12 items-center justify-center rounded-md border-2 border-black px-4 py-2 text-2xl hover:bg-gray-700 hover:text-white">
            I am a Tutor
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
