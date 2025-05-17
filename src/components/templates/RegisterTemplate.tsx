import React from "react";
import { motion } from "framer-motion";
import RegisterForm from "@/components/organisms/RegisterForm";

interface IRegisterTemplateProps {
  onSubmit: (name: string, email: string, password: string) => void;
  isLoading: boolean;
  error?: string;
  className?: string;
  testId?: string;
}

const RegisterTemplate = (props: IRegisterTemplateProps) => {
  const { onSubmit, isLoading, error, className = "", testId } = props;

  const renderDecorativeElements = () => {
    return (
      <>
        <motion.div
          className="absolute -top-16 -left-16 w-28 h-28 bg-indigo-300 rounded-xl opacity-40 mix-blend-multiply"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.4,
            scale: 1,
            y: [0, 10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute top-32 -right-14 w-24 h-24 bg-purple-300 rounded-full opacity-40 mix-blend-multiply"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.4,
            scale: 1,
            y: [0, -12, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
        />

        <motion.div
          className="absolute -bottom-10 right-10 w-20 h-20 bg-pink-300 rounded-lg opacity-40 mix-blend-multiply"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 0.4,
            scale: 1,
            y: [0, 8, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </>
    );
  };

  const renderRegisterForm = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RegisterForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          error={error}
          className="backdrop-blur-sm bg-white/90 border border-white/20 shadow-xl"
        />
      </motion.div>
    );
  };

  return (
    <div
      className={`relative z-10 ${className}`}
      data-testid={testId || "register-template"}
    >
      {renderDecorativeElements()}
      {renderRegisterForm()}
    </div>
  );
};

export default RegisterTemplate;
