import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import HeroSection from "./components/HeroSection";
import CardContainer from "./components/CardContainer";
import { Outlet } from "react-router-dom";
import LandingPage from "./components/LandingPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-auto w-screen flex-col align-middle">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
