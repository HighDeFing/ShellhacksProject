import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <div className="box-border flex h-14 w-[860px] items-center justify-center rounded-lg border-2 border-black p-4">
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
