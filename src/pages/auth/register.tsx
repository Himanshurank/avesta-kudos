import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthLayout from "@/components/templates/AuthLayout";
import RegisterTemplate from "@/components/templates/RegisterTemplate";
import { useAuthContext } from "@/components/contexts/AuthContext";

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { register } = useAuthContext();

  const handleSubmit = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      setError(undefined);

      const result = await register(email, password, name);

      if (result.success) {
        router.push({
          pathname: "/auth/registration-success",
          query: { email },
        });
      } else {
        setError(result.message);
      }
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
