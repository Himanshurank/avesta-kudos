import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  label?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  color = "border-indigo-500",
  label,
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 border-2",
    md: "h-12 w-12 border-t-2 border-b-2",
    lg: "h-16 w-16 border-4",
  };

  return (
    <div className="flex items-center gap-2">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${color} ${className}`}
        aria-label="Loading"
      ></div>
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
};

export default LoadingSpinner;
