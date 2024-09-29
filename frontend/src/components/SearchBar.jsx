import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

const SearchBar = ({ onSearch, isModalOpen }) => {
  const [scrollPos, setScrollPos] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateWidth = () => {
    const minWidth = 550;
    const maxWidth = window.innerWidth - 161;
    const range = maxWidth - minWidth;
    const scrollThreshold = 500;

    const width = Math.max(
      minWidth,
      maxWidth - (scrollPos / scrollThreshold) * range
    );
    return `${width}px`;
  };

  const calculatePadding = () => {
    const minPadding = 11;
    const maxPadding = 16;
    const scrollThreshold = 800; // Match this threshold with the width

    const padding = Math.max(
      minPadding,
      maxPadding - (scrollPos / scrollThreshold) * (maxPadding - minPadding)
    );
    return `${padding}px`;
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  // Toggle z-index and pointer events based on whether the modal is open
  const searchBarZIndex = isModalOpen ? "-z-10" : "z-10";
  const pointerEvents = isModalOpen ? "pointer-events-none" : "";

  return (
    <div
      className={`sticky top-0 mx-auto py-5 transition-all duration-700 ease-in-out ${searchBarZIndex} ${pointerEvents}`}
      style={{
        width: calculateWidth(),
        pointerEvents: "none",
      }}
    >
      <div
        className="mx-auto box-border flex h-14 max-w-screen-xl items-center justify-center rounded-lg border-2 border-black bg-white transition-all duration-200 ease-in-out"
        style={{
          paddingLeft: calculatePadding(),
          paddingRight: calculatePadding(),
          pointerEvents: "auto",
        }}
      >
        <label className="sr-only">Course Search</label>
        <input
          type="text"
          id="course-search"
          placeholder="Search Courses"
          className="h-full w-full border-none bg-white pl-2 font-newfrank text-lg font-light text-black placeholder-black placeholder-opacity-70 outline-none"
          value={query}
          onChange={handleInputChange}
        />
        <FaSearch className="ml-2 text-xl text-black" />
      </div>
    </div>
  );
};

export default SearchBar;
