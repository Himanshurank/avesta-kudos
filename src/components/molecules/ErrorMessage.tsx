import React from "react";
import { motion } from "framer-motion";

interface IErrorMessageProps {
  message: string;
  className?: string;
  testId?: string;
}

const ErrorMessage = (props: IErrorMessageProps) => {
  const { message, className = "", testId } = props;

  if (!message) return null;

  return (
    <motion.div
      className={`mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md ${className}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
      data-testid={testId || "error-message"}
    >
      {message}
    </motion.div>
  );
};

export default ErrorMessage;
