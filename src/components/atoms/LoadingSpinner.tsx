import React from "react";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  className = "",
}) => {
  const sizeClasses = {
    small: "h-6 w-6 border-t-1 border-b-1",
    medium: "h-12 w-12 border-t-2 border-b-2",
    large: "h-16 w-16 border-t-3 border-b-3",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} border-indigo-600 ${className}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
