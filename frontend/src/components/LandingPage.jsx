import { useState } from "react";
import SearchBar from "./SearchBar";
import CardContainer from "./CardContainer";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query when the user types
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />{" "}
      {/* Pass handleSearch to SearchBar */}
      <CardContainer searchQuery={searchQuery} />{" "}
      {/* Pass searchQuery to CardContainer */}
    </>
  );
};

export default LandingPage;
