import React from "react";
import ChartPlaceholder from "@/components/atoms/ChartPlaceholder";

interface ChartCardProps {
  title: string;
  description: string;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={`bg-white p-5 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <ChartPlaceholder />
    </div>
  );
};

export default ChartCard;
