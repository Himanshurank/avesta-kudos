import React from "react";
import { motion } from "framer-motion";
import Logo from "@/components/atoms/Logo";

interface IAuthHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  testId?: string;
}

const AuthHeader = (props: IAuthHeaderProps) => {
  const { title, subtitle, className = "", testId } = props;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
      }}
      className={`text-center mb-6 ${className}`}
      data-testid={testId || "auth-header"}
    >
      <div className="inline-block">
        <Logo className="mx-auto mb-2" />
        <motion.div
          className="h-1 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"
          variants={{
            hidden: { width: 0 },
            visible: { width: "100%" },
          }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </div>
      <motion.h1
        className="text-2xl font-bold text-gray-800 mt-4"
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="text-gray-600"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default AuthHeader;
