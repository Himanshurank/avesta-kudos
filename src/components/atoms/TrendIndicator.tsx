import React from "react";

interface TrendIndicatorProps {
  direction: "up" | "down" | "same";
  value: string;
  className?: string;
}

const TrendIndicator: React.FC<TrendIndicatorProps> = ({
  direction,
  value,
  className = "",
}) => {
  return (
    <span
      className={`flex items-center text-sm ${
        direction === "up"
          ? "text-green-600"
          : direction === "down"
          ? "text-red-600"
          : "text-gray-500"
      } ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-1"
      >
        <path
          d={
            direction === "up"
              ? "M18 15L12 9L6 15"
              : direction === "down"
              ? "M6 9L12 15L18 9"
              : "M5 12H19"
          }
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {value}
    </span>
  );
};

export default TrendIndicator;
