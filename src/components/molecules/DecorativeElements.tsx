import React from "react";
import { motion } from "framer-motion";

interface IDecorativeElementsProps {
  className?: string;
  testId?: string;
}

const DecorativeElements = (props: IDecorativeElementsProps) => {
  const { className = "", testId } = props;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      data-testid={testId || "decorative-elements"}
    >
      <motion.div
        className="absolute -top-20 left-20 h-16 w-16 rounded-lg bg-purple-300 opacity-40 mix-blend-multiply transform -rotate-12"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.5, 0.4],
          y: [0, 15, 0],
          rotate: [-12, 0, -12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-10 -right-10 h-12 w-12 rounded-full bg-indigo-300 opacity-40 mix-blend-multiply"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 0.6, 0.4],
          y: [0, -10, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute -bottom-10 -left-10 h-20 w-20 rounded-full bg-pink-300 opacity-30 mix-blend-multiply"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.4, 0.3],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  );
};

export default DecorativeElements;
