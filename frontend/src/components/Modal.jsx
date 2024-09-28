import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useState } from "react";
import LoginForm from "./LoginForm";

const Modal = ({ buttonText, role }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex h-12 items-center justify-center rounded-md border-2 border-black px-4 py-2 text-2xl hover:bg-gray-700 hover:text-white"
      >
        {buttonText}
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} role={role} />
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen, role }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 grid cursor-pointer place-items-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg cursor-default overflow-hidden rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white shadow-xl"
          >
            <FiAlertCircle className="absolute -left-24 -top-24 z-0 rotate-12 text-[250px] text-white/10" />
            <div className="relative z-10">
              <LoginForm role={role} setIsOpen={setIsOpen} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
