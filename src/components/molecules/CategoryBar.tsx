import React from "react";

interface CategoryBarProps {
  name: string;
  count: number;
  percentage: number;
  className?: string;
}

const CategoryBar: React.FC<CategoryBarProps> = ({
  name,
  count,
  percentage,
  className = "",
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-gray-700">{name}</span>
        <span className="text-gray-500 text-sm">
          {count} kudos ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CategoryBar;
