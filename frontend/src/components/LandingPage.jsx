import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import SearchBar from "./SearchBar";
import CardContainer from "./CardContainer";
import HeroSection from "./HeroSection";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isModalOpen, setIsModalOpen } = useOutletContext(); // Access context from App

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      {/* Pass the isModalOpen state to SearchBar */}
      <HeroSection />
      <SearchBar onSearch={handleSearch} isModalOpen={isModalOpen} />
      <CardContainer searchQuery={searchQuery} />
    </>
  );
};

export default LandingPage;
