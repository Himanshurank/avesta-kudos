import React from "react";
import CategoryBar from "@/components/molecules/CategoryBar";

interface Category {
  id: number;
  name: string;
  count: number;
  percentage: number;
}

interface TopCategoriesSectionProps {
  data: Category[];
  onExportData: () => void;
  className?: string;
}

const TopCategoriesSection: React.FC<TopCategoriesSectionProps> = ({
  data,
  onExportData,
  className = "",
}) => {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Popular Categories
      </h3>
      <div className="space-y-4">
        {data.map((category) => (
          <CategoryBar
            key={category.id}
            name={category.name}
            count={category.count}
            percentage={category.percentage}
          />
        ))}
      </div>
      <button
        onClick={onExportData}
        className="mt-6 w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center font-medium"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2"
        >
          <path
            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15V3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Export Analytics Data
      </button>
    </div>
  );
};

export default TopCategoriesSection;
