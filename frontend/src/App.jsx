import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state in App

  return (
    <div className="app">
      {/* Pass setIsModalOpen to Header */}
      <Header setIsModalOpen={setIsModalOpen} />
      {/* Render children components */}
      <Outlet context={{ isModalOpen, setIsModalOpen }} />
    </div>
  );
}

export default App;
