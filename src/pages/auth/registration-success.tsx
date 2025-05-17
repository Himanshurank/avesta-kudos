import React from "react";
import { useRouter } from "next/router";
import AuthLayout from "@/components/templates/AuthLayout";
import RegistrationSuccessTemplate from "@/components/templates/RegistrationSuccessTemplate";

const RegistrationSuccessPage = () => {
  const router = useRouter();
  const { email } = router.query;

  return (
    <AuthLayout
      title="Registration Successful"
      description="Your account registration was successful"
      showDecoration={true}
    >
      <RegistrationSuccessTemplate email={email as string} />
    </AuthLayout>
  );
};

export default RegistrationSuccessPage;
