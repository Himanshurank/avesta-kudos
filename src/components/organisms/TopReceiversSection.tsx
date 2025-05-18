import React from "react";
import PersonItem from "@/components/molecules/PersonItem";

interface KudosReceiver {
  id: number;
  name: string;
  count: number;
  trend: "up" | "down" | "same";
}

interface TopReceiversSectionProps {
  data: KudosReceiver[];
  onViewFullReport: () => void;
  className?: string;
}

const TopReceiversSection: React.FC<TopReceiversSectionProps> = ({
  data,
  onViewFullReport,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className} flex flex-col`}>
      {/* Top Receivers Section */}
      <div className="p-6 flex-grow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Top Kudos Receivers
          </h3>
          <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded">Top {data.length}</div>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          Most recognized individuals across all departments
        </p>
        <div className="space-y-4">
          {data.map((person) => (
            <PersonItem
              key={person.id}
              name={person.name}
              count={person.count}
              trend={person.trend}
            />
          ))}
        </div>
      </div>
      
      {/* View Report Section */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-100">
        <button
          onClick={onViewFullReport}
          className="w-full py-2.5 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-colors flex items-center justify-center font-medium"
        >
          View Full Report
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              d="M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopReceiversSection;
