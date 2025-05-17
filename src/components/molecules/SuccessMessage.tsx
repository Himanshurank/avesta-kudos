import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/atoms/Button";

interface ISuccessMessageProps {
  email: string;
  className?: string;
  testId?: string;
}

const SuccessMessage = (props: ISuccessMessageProps) => {
  const { email, className = "", testId } = props;

  return (
    <motion.div
      className={`text-center ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      data-testid={testId || "success-message"}
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
      >
        <motion.svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />
        </motion.svg>
      </motion.div>

      <motion.p
        className="text-gray-600 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        If an account exists for{" "}
        <span className="font-medium text-indigo-600">{email}</span>, you will
        receive a password reset email shortly.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Link href="/auth/login">
          <Button className="mb-4 px-8">Return to Login</Button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default SuccessMessage;
