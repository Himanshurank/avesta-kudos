import React from "react";
import AuthLayout from "@/components/templates/AuthLayout";
import ForgotPasswordTemplate from "@/components/templates/ForgotPasswordTemplate";

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      title="Forgot Password"
      description="Reset your Digital Kudos password"
      showDecoration={true}
    >
      <ForgotPasswordTemplate />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
