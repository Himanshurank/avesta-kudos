import React from "react";

interface ChartPlaceholderProps {
  height?: string;
  className?: string;
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  height = "h-48",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-100 rounded-lg p-4 flex items-center justify-center ${height} ${className}`}
    >
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
};

export default ChartPlaceholder;
