import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const [isSticky, setIsSticky] = useState(false);

  // Listen for scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Get the Y offset position
      if (window.scrollY > 50) {
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

  return (
    <div
      className={`sticky top-0 z-50 mx-auto flex w-full max-w-screen-2xl items-center justify-center border-2 px-3 transition-all duration-300 ${
        isSticky ? "h-16" : "min-h-24"
      }`}
    >
      <div className="box-border flex h-14 w-full max-w-screen-2xl items-center justify-center rounded-lg border-2 border-black bg-white p-4">
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
