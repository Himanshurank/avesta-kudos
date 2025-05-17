import React, { useState } from "react";
import AuthLayout from "@/components/templates/AuthLayout";
import ForgotPasswordTemplate from "@/components/templates/ForgotPasswordTemplate";
import { useAuthContext } from "@/components/contexts/AuthContext";

const ForgotPasswordPage = () => {
  const { resetPasswordRequest } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPasswordRequest = async (email: string) => {
    setIsLoading(true);
    try {
      const result = await resetPasswordRequest(email);
      setIsLoading(false);
      return result.success;
    } catch (err) {
      console.error("Error requesting password reset:", err);
      setIsLoading(false);
      return false;
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      description="Reset your Digital Kudos password"
      showDecoration={true}
    >
      <ForgotPasswordTemplate
        onSubmit={handleResetPasswordRequest}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
