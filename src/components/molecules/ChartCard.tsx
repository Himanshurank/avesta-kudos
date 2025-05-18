import React from "react";
import KudosTimeChart from "@/components/atoms/KudosTimeChart";
import TeamComparisonChart from "@/components/atoms/TeamComparisonChart";

interface ChartCardProps {
  title: string;
  description: string;
  timeRange?: string;
  className?: string;
  data?: any;
  timePeriod?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  timeRange = "month",
  className = "",
  data = [],
  timePeriod,
}) => {
  const renderChart = () => {
    switch (title) {
      case "Kudos Over Time":
        return (
          <KudosTimeChart
            timeRange={timeRange}
            data={data}
            timePeriod={timePeriod}
          />
        );
      case "Team Comparison":
        return <TeamComparisonChart data={data} />;
      default:
        return (
          <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-48">
            <div className="text-center">
              <div className="text-gray-400 mb-2">
                [Chart visualization would appear here]
              </div>
              <div className="text-xs text-gray-500">
                This is a placeholder for actual chart data
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`bg-white p-5 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      {renderChart()}
    </div>
  );
};

export default ChartCard;
