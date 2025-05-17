import React from "react";
import Head from "next/head";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showDecoration?: boolean;
}

const AuthLayout = (props: AuthLayoutProps) => {
  const {
    children,
    title,
    description = "Sign in to your Digital Kudos account",
    showDecoration = true,
  } = props;

  return (
    <>
      <Head>
        <title>{title} | Digital Kudos</title>
        <meta name="description" content={description} />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {showDecoration && (
          <>
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </>
        )}

        {/* Main content */}
        <div className="z-10 w-full max-w-md">{children}</div>
      </div>
    </>
  );
};

export default AuthLayout;
