import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  testId?: string;
}

const Logo = (props: LogoProps) => {
  const { size = "md", className = "", testId } = props;

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "text-xl";
      case "md":
        return "text-2xl";
      case "lg":
        return "text-3xl";
      default:
        return "text-2xl";
    }
  };

  return (
    <div
      className={`font-bold ${getSizeClasses()} text-indigo-600 ${className}`}
      data-testid={testId || "logo"}
    >
      Digital Kudos
    </div>
  );
};

export default Logo;
