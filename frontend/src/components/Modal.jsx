import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import LoginForm from "./LoginForm";

const Modal = ({ buttonText, role, setIsModalOpen }) => {
  const [isOpen, setIsOpenState] = useState(false);

  const handleOpen = () => {
    // Set the search bar z-index first with a small delay before opening the modal
    setIsModalOpen(true); // Trigger the search bar z-index change
    setTimeout(() => {
      setIsOpenState(true); // Open the modal after the delay
    }, 200); // Delay of 200ms to allow search bar z-index to switch
  };

  const handleClose = () => {
    setIsOpenState(false);
    setTimeout(() => {
      setIsModalOpen(false); // Reset the search bar z-index after modal closes
    }, 200); // Close the modal and reset z-index after delay
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="border-fiu-gold hover:bg-fiu-gold z-10 box-content flex cursor-pointer items-center justify-center gap-2 rounded-lg border-[3px] px-8 py-3 text-white transition-all duration-300 hover:border-[#8e7512] hover:font-bold"
      >
        <p className="whitespace-nowrap">{buttonText}</p>
      </button>
      <SpringModal isOpen={isOpen} handleClose={handleClose} role={role} />
    </div>
  );
};

const SpringModal = ({ isOpen, handleClose, role }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-900/30 p-8 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="from-fiu-gold to-fiu-blue relative w-full max-w-lg cursor-default overflow-hidden rounded-lg bg-gradient-to-br p-6 text-white shadow-xl"
          >
            <FiAlertCircle className="absolute -left-24 -top-24 z-0 rotate-12 text-[250px] text-white/10" />
            <div className="relative z-10">
              <LoginForm role={role} setIsOpen={handleClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
