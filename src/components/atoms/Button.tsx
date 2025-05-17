import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  testId?: string;
  fullWidth?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    type = "button",
    variant = "primary",
    size = "md",
    className = "",
    children,
    onClick,
    disabled = false,
    testId,
    fullWidth = false,
  } = props;

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500";
      case "secondary":
        return "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500";
      case "outline":
        return "bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500";
      default:
        return "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-sm py-2 px-3";
      case "md":
        return "text-base py-2 px-4";
      case "lg":
        return "text-lg py-3 px-6";
      default:
        return "text-base py-2 px-4";
    }
  };

  return (
    <button
      type={type}
      className={`
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${fullWidth ? "w-full" : ""}
        rounded-md font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
        transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId || "button"}
    >
      {children}
    </button>
  );
};

export default Button;
