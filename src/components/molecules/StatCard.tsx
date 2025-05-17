import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  trend: "up" | "down" | "same";
  percentage: number;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  percentage,
  className = "",
}) => {
  // Determine trend color and icon
  const trendColor =
    trend === "up"
      ? "text-green-500"
      : trend === "down"
      ? "text-red-500"
      : "text-gray-500";
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : "→";

  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl">
          {icon}
        </div>
        <h2 className="ml-3 text-lg font-medium text-gray-700">{title}</h2>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>

        {percentage > 0 && (
          <div className={`flex items-center ${trendColor}`}>
            <span className="text-lg mr-1">{trendIcon}</span>
            <span>{percentage}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
