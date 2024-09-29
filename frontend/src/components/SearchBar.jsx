import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [query, setQuery] = useState("");

  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true); // If scrolled more than 50px
      } else {
        setIsSticky(false); // If not scrolled enough
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle search input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Pass the query to the parent component
  };

  return (
    <div
      className={`sticky top-0 z-10 mx-auto flex items-center justify-center px-3 py-3 transition-all duration-500 ${
        isSticky ? "w-[55%]" : "w-full"
      }`}
    >
      <div
        className={`box-border flex h-16 w-full max-w-screen-2xl items-center justify-center rounded-lg border-2 border-black bg-white transition-all duration-300 ${
          isSticky ? "w-4/5 p-2" : "w-full p-4"
        }`}
      >
        <label className="sr-only">Course Search</label>
        <input
          type="text"
          id="course-search"
          placeholder="Search Courses"
          className="h-full w-full border-none bg-white pl-2 text-lg text-black placeholder-black placeholder-opacity-70 outline-none"
          value={query}
          onChange={handleInputChange}
        />
        <FaSearch className="ml-2 text-xl text-black" />
      </div>
    </div>
  );
};

export default SearchBar;
