import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import ErrorMessage from "@/components/molecules/ErrorMessage";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

interface IForgotPasswordFormProps {
  onSubmitSuccess: (email: string) => Promise<boolean> | void;
  isLoading?: boolean;
  className?: string;
  testId?: string;
}

const ForgotPasswordForm = (props: IForgotPasswordFormProps) => {
  const { onSubmitSuccess, isLoading = false, className = "", testId } = props;

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const validateForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setError(undefined);
      await onSubmitSuccess(email);
    } catch (err) {
      console.error("Password reset request error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const renderLoginLink = () => {
    return (
      <motion.div
        className="text-center mt-6"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }}
      >
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={className}
      data-testid={testId || "forgot-password-form"}
    >
      <ErrorMessage message={error || ""} />

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
        className="mt-6"
      >
        <Button type="submit" fullWidth disabled={isLoading} className="mb-4">
          {isLoading ? <LoadingSpinner label="Sending..." /> : "Reset Password"}
        </Button>
      </motion.div>

      {renderLoginLink()}
    </form>
  );
};

export default ForgotPasswordForm;
