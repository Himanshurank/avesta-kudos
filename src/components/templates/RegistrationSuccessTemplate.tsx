import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/atoms/Card";
import Logo from "@/components/atoms/Logo";
import Button from "@/components/atoms/Button";

interface IRegistrationSuccessTemplateProps {
  email?: string;
  className?: string;
  testId?: string;
}

const RegistrationSuccessTemplate = (
  props: IRegistrationSuccessTemplateProps
) => {
  const { email, className = "", testId } = props;

  const renderSuccessAnimation = () => {
    return (
      <div className="absolute -top-32 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2,
          }}
        >
          <motion.div
            className="absolute w-32 h-32 bg-green-200 rounded-full opacity-30"
            initial={{ scale: 0 }}
            animate={{ scale: 1.2 }}
            transition={{
              duration: 1,
              delay: 0.6,
            }}
          />
          <motion.div
            className="absolute w-24 h-24 bg-green-300 rounded-full opacity-40"
            initial={{ scale: 0 }}
            animate={{ scale: 1.1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
          />
          <motion.div
            className="relative w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            <motion.svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  const renderSuccessCard = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.4,
        }}
      >
        <Card className="p-8 text-center mt-16 backdrop-blur-sm bg-white/90 border border-white/20 shadow-xl">
          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Logo className="mb-4" />
            </motion.div>

            <motion.h1
              className="text-3xl font-bold text-gray-800 mb-3"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Registration Successful!
            </motion.h1>

            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-6"
              variants={{
                hidden: { width: 0, opacity: 0 },
                visible: {
                  width: 80,
                  opacity: 1,
                  transition: { duration: 0.6 },
                },
              }}
            />

            <motion.p
              className="text-gray-600 mb-4"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Thank you for registering. We have sent a confirmation email to{" "}
              <span className="font-medium text-indigo-600">
                {email || "your email address"}
              </span>
              .
            </motion.p>

            <motion.p
              className="text-gray-600 mb-8"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              Your account needs to be approved by an administrator before you
              can log in. We will notify you by email once your account has been
              approved.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link href="/auth/login">
                <Button className="px-8">Return to Login</Button>
              </Link>
            </motion.div>
          </motion.div>
        </Card>
      </motion.div>
    );
  };

  const renderConfetti = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-${Math.floor(Math.random() * 3) + 2} h-${
              Math.floor(Math.random() * 3) + 2
            } rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: [
                "#818CF8",
                "#C084FC",
                "#F472B6",
                "#34D399",
                "#A78BFA",
              ][Math.floor(Math.random() * 5)],
              opacity: 0.6,
            }}
            animate={{
              y: [0, -30],
              x: [0, Math.random() * 20 - 10],
              opacity: [0.7, 0],
              scale: [1, 0.8],
            }}
            transition={{
              duration: Math.random() * 2 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              repeatType: "loop",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`relative ${className}`}
      data-testid={testId || "registration-success-template"}
    >
      {renderSuccessAnimation()}
      {renderSuccessCard()}
      {renderConfetti()}
    </div>
  );
};

export default RegistrationSuccessTemplate;
