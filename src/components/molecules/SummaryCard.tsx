import React from "react";
import TrendIndicator from "@/components/atoms/TrendIndicator";

interface SummaryCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon: React.ReactNode;
  bgColor: string;
  timeRange: string;
  className?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  trend,
  trendDirection,
  icon,
  bgColor,
  timeRange,
  className = "",
}) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{value}</h3>
        </div>
        <div className={`p-2 ${bgColor} rounded-md`}>{icon}</div>
      </div>
      <div className="flex items-center mt-4">
        <TrendIndicator direction={trendDirection} value={trend} />
        <span className="text-gray-500 text-sm ml-2">
          vs. previous {timeRange}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
