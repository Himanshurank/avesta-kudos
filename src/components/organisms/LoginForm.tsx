import React, { useState } from "react";
import Link from "next/link";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Logo from "@/components/atoms/Logo";

interface ILoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading?: boolean;
  className?: string;
  testId?: string;
}

const LoginForm = (props: ILoginFormProps) => {
  const { onSubmit, isLoading = false, className = "", testId } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(email, password);
    }
  };

  const renderHeader = () => {
    return (
      <div className="text-center mb-6">
        <Logo className="mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
        <p className="text-gray-600">Sign in to access your account</p>
      </div>
    );
  };

  const renderEmailField = () => {
    return (
      <FormField
        id="email"
        label="Email"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        error={validationErrors.email}
        disabled={isLoading}
      />
    );
  };

  const renderPasswordField = () => {
    return (
      <FormField
        id="password"
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        error={validationErrors.password}
        disabled={isLoading}
      />
    );
  };

  const renderFormOptions = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link
            href="/auth/forgot-password"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    );
  };

  const renderSubmitButton = () => {
    return (
      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    );
  };

  const renderSignupLink = () => {
    return (
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        {renderEmailField()}
        {renderPasswordField()}
        {renderFormOptions()}
        {renderSubmitButton()}
        {renderSignupLink()}
      </form>
    );
  };

  return (
    <Card
      className={`p-8 w-full max-w-md ${className}`}
      testId={testId || "login-form"}
    >
      {renderHeader()}
      {renderForm()}
    </Card>
  );
};

export default LoginForm;
