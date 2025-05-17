import React from "react";
import { motion } from "framer-motion";

interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  variant: "primary" | "secondary";
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  text,
  onClick,
  variant,
  className = "",
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 rounded-lg shadow-sm transition-colors ${
        variant === "primary"
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : "bg-white border border-slate-200 text-black hover:bg-slate-50"
      } ${className}`}
    >
      {icon}
      {text}
    </motion.button>
  );
};

export default ActionButton;
