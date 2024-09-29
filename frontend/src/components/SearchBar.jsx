import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="sticky top-0 z-0 mx-auto flex min-h-24 w-1/2 items-center justify-center">
      <div className="box-border flex h-14 w-[860px] items-center justify-center rounded-lg border-2 border-black bg-white p-4">
        <label className="sr-only">Course Search</label>
        <input
          type="text"
          id="product-search"
          placeholder="Search Courses"
          className="h-full w-full border-none bg-white pl-2 text-lg text-black placeholder-black placeholder-opacity-70 outline-none"
        />
        <FaSearch className="ml-2 text-xl text-black" />
      </div>
    </div>
  );
};

export default SearchBar;
