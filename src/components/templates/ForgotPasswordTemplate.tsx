import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import AuthHeader from "@/components/organisms/AuthHeader";
import ForgotPasswordForm from "@/components/organisms/ForgotPasswordForm";
import SuccessMessage from "@/components/molecules/SuccessMessage";
import DecorativeElements from "@/components/molecules/DecorativeElements";

interface IForgotPasswordTemplateProps {
  className?: string;
  testId?: string;
}

const ForgotPasswordTemplate = (props: IForgotPasswordTemplateProps) => {
  const { className = "", testId } = props;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmitSuccess = (email: string) => {
    setSubmittedEmail(email);
    setIsSubmitted(true);
  };

  return (
    <div
      className={`relative z-10 ${className}`}
      data-testid={testId || "forgot-password-template"}
    >
      <DecorativeElements />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 backdrop-blur-sm bg-white/90 border border-white/20 shadow-xl overflow-visible">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            <AuthHeader
              title="Forgot Password"
              subtitle="Enter your email to reset your password"
            />

            {isSubmitted ? (
              <SuccessMessage email={submittedEmail} />
            ) : (
              <ForgotPasswordForm onSubmitSuccess={handleSubmitSuccess} />
            )}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordTemplate;
