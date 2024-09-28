import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import HeroSection from "./components/HeroSection";
import CardContainer from "./components/CardContainer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-dvh w-screen flex-col align-middle">
      <Header />
      <SearchBar />
      <HeroSection />
      <CardContainer />
    </div>
  );
}

export default App;
