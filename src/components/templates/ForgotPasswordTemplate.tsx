import React, { useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import AuthHeader from "@/components/organisms/AuthHeader";
import ForgotPasswordForm from "@/components/organisms/ForgotPasswordForm";
import SuccessMessage from "@/components/molecules/SuccessMessage";
import DecorativeElements from "@/components/molecules/DecorativeElements";

interface IForgotPasswordTemplateProps {
  onSubmit?: (email: string) => Promise<boolean>;
  isLoading?: boolean;
  className?: string;
  testId?: string;
}

const ForgotPasswordTemplate = (props: IForgotPasswordTemplateProps) => {
  const { onSubmit, isLoading = false, className = "", testId } = props;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmitSuccess = (email: string) => {
    setSubmittedEmail(email);
    setIsSubmitted(true);
  };

  // Handler for form submission that uses the onSubmit prop if provided
  const handleSubmit = async (email: string) => {
    if (onSubmit) {
      const success = await onSubmit(email);
      if (success) {
        handleSubmitSuccess(email);
      }
      return success;
    }

    // Default behavior if no onSubmit is provided
    handleSubmitSuccess(email);
    return true;
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
              <ForgotPasswordForm
                onSubmitSuccess={handleSubmit}
                isLoading={isLoading}
              />
            )}
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordTemplate;
