import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthLayout from "@/components/templates/AuthLayout";
import RegisterTemplate from "@/components/templates/RegisterTemplate";

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleSubmit = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      setError(undefined);

      // For demo purposes only - replace with actual API call
      console.log("Registration attempt:", { name, email, password });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock registration success
      // Redirect to confirmation page
      router.push({
        pathname: "/auth/registration-success",
        query: { email },
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      description="Sign up for Digital Kudos to start recognizing your colleagues"
      showDecoration={true}
    >
      <RegisterTemplate
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </AuthLayout>
  );
};

export default RegisterPage;
