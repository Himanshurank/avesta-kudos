import React from "react";
import TrendIndicator from "@/components/atoms/TrendIndicator";

interface PersonItemProps {
  name: string;
  count: number;
  trend: "up" | "down" | "same";
  className?: string;
}

const PersonItem: React.FC<PersonItemProps> = ({
  name,
  count,
  trend,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-between border-b border-gray-100 pb-3 ${className}`}
    >
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
          {name.charAt(0)}
        </div>
        <span className="ml-3 text-gray-700">{name}</span>
      </div>
      <div className="flex items-center">
        <span className="font-semibold text-gray-800 mr-2">{count}</span>
        <TrendIndicator direction={trend} value="" />
      </div>
    </div>
  );
};

export default PersonItem;
