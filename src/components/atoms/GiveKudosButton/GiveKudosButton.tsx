import React from "react";
import { motion } from "framer-motion";

interface IProps {
  onClick: () => void;
  className?: string;
  testId?: string;
  isFloating?: boolean;
}

const GiveKudosButton = (props: IProps) => {
  const { onClick, className = "", testId, isFloating = true } = props;

  const baseClasses =
    "flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200";
  const floatingClasses =
    "fixed bottom-8 right-8 z-30 p-4 rounded-full shadow-lg";
  const standardClasses =
    "px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm";

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${
        isFloating ? floatingClasses : standardClasses
      } ${className}`}
      data-testid={testId || "give-kudos-button"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
      <span className="font-medium">Give Kudos</span>
    </motion.button>
  );
};

export default GiveKudosButton;
