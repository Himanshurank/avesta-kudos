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
        return "btn-primary";
      case "secondary":
        return "btn-secondary";
      case "outline":
        return "btn-outline";
      default:
        return "btn-primary";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "btn-sm";
      case "md":
        return "btn-md";
      case "lg":
        return "btn-lg";
      default:
        return "btn-md";
    }
  };

  return (
    <button
      type={type}
      className={`btn ${getVariantClasses()} ${getSizeClasses()} ${fullWidth ? "w-full" : ""} ${className}`}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId || "button"}
    >
      {children}
    </button>
  );
};

export default Button;
