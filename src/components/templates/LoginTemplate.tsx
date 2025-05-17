import React from "react";
import { motion } from "framer-motion";
import LoginForm from "@/components/organisms/LoginForm";

interface ILoginTemplateProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  className?: string;
  testId?: string;
}

const LoginTemplate = (props: ILoginTemplateProps) => {
  const { onSubmit, isLoading, className = "", testId } = props;

  const renderDecorativeElements = () => {
    return (
      <>
        <motion.div
          className="absolute -top-20 -right-16 w-32 h-32 bg-purple-300 rounded-xl opacity-40 mix-blend-multiply"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute -bottom-16 -left-20 w-36 h-36 bg-indigo-300 rounded-full opacity-40 mix-blend-multiply"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </>
    );
  };

  const renderLoginForm = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LoginForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          className="backdrop-blur-sm bg-white/90 border border-white/20 shadow-xl"
        />
      </motion.div>
    );
  };

  const renderHintText = () => {
    return (
      <motion.div
        className="mt-6 text-center text-gray-500 text-sm bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm mx-auto max-w-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <p>Demo credentials: demo@example.com / password</p>
      </motion.div>
    );
  };

  return (
    <div
      className={`relative z-10 ${className}`}
      data-testid={testId || "login-template"}
    >
      {renderDecorativeElements()}
      {renderLoginForm()}
      {renderHintText()}
    </div>
  );
};

export default LoginTemplate;
