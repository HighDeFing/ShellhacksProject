import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState, useEffect } from "react";

const Header = ({ setIsModalOpen }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
  };

  return (
    <div className="bg-fiu-blue sticky top-0 mb-12 h-24 min-h-24 w-full border-b border-black border-opacity-5">
      <div className="flex h-full w-full items-center justify-between px-12">
        <Link to="/">
          <p className="font-newfrank text-5xl font-bold text-white">
            <b>T</b>utor<b>F</b>inder
          </p>
        </Link>
        <div className="flex space-x-7">
          {authToken ? (
            <>
              <button
                onClick={handleLogout}
                className="border-fiu-gold hover:bg-fiu-gold z-10 box-content flex cursor-pointer items-center justify-center gap-2 rounded-lg border-[3px] px-8 py-3 text-white transition-all duration-300 hover:border-[#8e7512] hover:font-bold"
              >
                <p className="w-18">Logout</p>
              </button>

              <Link to="/profile">
                <button className="border-fiu-gold hover:bg-fiu-gold z-10 box-content flex cursor-pointer items-center justify-center gap-2 rounded-lg border-[3px] px-8 py-3 text-white transition-all duration-300 hover:border-[#8e7512] hover:font-bold">
                  <p className="w-24">Profile</p>
                </button>
              </Link>
            </>
          ) : (
            <div className="z-50 flex gap-4">
              <Modal
                role="student"
                buttonText="I am a Student"
                setIsModalOpen={setIsModalOpen}
              />
              <Modal
                role="tutor"
                buttonText="I am a Tutor"
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
