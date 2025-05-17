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
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Top Kudos Receivers
      </h3>
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
      <button
        onClick={onViewFullReport}
        className="mt-4 text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center"
      >
        View Full Report
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-1"
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
  );
};

export default TopReceiversSection;
