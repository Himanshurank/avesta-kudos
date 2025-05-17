import React, { useState } from "react";
import Link from "next/link";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Logo from "@/components/atoms/Logo";

interface IRegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  isLoading?: boolean;
  error?: string;
  className?: string;
  testId?: string;
}

const RegisterForm = (props: IRegisterFormProps) => {
  const { onSubmit, isLoading = false, error, className = "", testId } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
  }>({});

  const validateForm = () => {
    const errors: {
      name?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      acceptTerms?: string;
    } = {};

    if (!name) {
      errors.name = "Name is required";
    }

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

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      errors.acceptTerms = "You must accept the terms and conditions";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(name, email, password);
    }
  };

  const renderHeader = () => {
    return (
      <div className="text-center mb-6">
        <Logo className="mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
        <p className="text-gray-600">Sign up to start using Digital Kudos</p>
      </div>
    );
  };

  const renderErrorMessage = () => {
    if (!error) return null;

    return (
      <div
        className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md"
        data-testid="register-error"
      >
        {error}
      </div>
    );
  };

  const renderNameField = () => {
    return (
      <FormField
        id="name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        error={validationErrors.name}
        disabled={isLoading}
      />
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

  const renderConfirmPasswordField = () => {
    return (
      <FormField
        id="confirmPassword"
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        error={validationErrors.confirmPassword}
        disabled={isLoading}
      />
    );
  };

  const renderTermsCheckbox = () => {
    return (
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="text-gray-700">
            I accept the{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Terms and Conditions
            </a>
          </label>
          {validationErrors.acceptTerms && (
            <p className="mt-1 text-sm text-red-600">
              {validationErrors.acceptTerms}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderSubmitButton = () => {
    return (
      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    );
  };

  const renderLoginLink = () => {
    return (
      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        {renderErrorMessage()}
        {renderNameField()}
        {renderEmailField()}
        {renderPasswordField()}
        {renderConfirmPasswordField()}
        {renderTermsCheckbox()}
        {renderSubmitButton()}
        {renderLoginLink()}
      </form>
    );
  };

  return (
    <Card
      className={`p-8 w-full max-w-md ${className}`}
      testId={testId || "register-form"}
    >
      {renderHeader()}
      {renderForm()}
    </Card>
  );
};

export default RegisterForm;
