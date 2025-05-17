import React, { useState } from "react";
import { useRouter } from "next/router";
import AuthLayout from "@/components/templates/AuthLayout";
import LoginTemplate from "@/components/templates/LoginTemplate";
import { useAuth } from "@/core/application/context/AuthContext";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (email: string, password: string) => {
    setIsLoading(true);

    // Use the auth context login method which now handles toasts internally
    const success = await login(email, password);

    if (success) {
      // Show success toast and redirect to dashboard
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    }

    setIsLoading(false);
  };

  return (
    <AuthLayout title="Sign In" showDecoration={true}>
      <LoginTemplate onSubmit={handleSubmit} isLoading={isLoading} />
    </AuthLayout>
  );
};

export default LoginPage;
