import React from "react";
import FilterTag from "@/components/atoms/FilterTag/FilterTag";

interface IFilter {
  type: "search" | "team" | "category";
  value: string;
}

interface IProps {
  filters: IFilter[];
  onRemoveFilter: (type: string) => void;
  onClearAll: () => void;
  className?: string;
  testId?: string;
}

const ActiveFilters = (props: IProps) => {
  const { filters, onRemoveFilter, onClearAll, className = "", testId } = props;

  if (filters.length === 0) {
    return null;
  }

  const getFilterColorClasses = (type: string) => {
    switch (type) {
      case "search":
        return {
          bg: "bg-indigo-100",
          text: "text-indigo-800",
        };
      case "team":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
        };
      case "category":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
        };
    }
  };

  const renderFilterLabel = (type: string) => {
    switch (type) {
      case "search":
        return "Search";
      case "team":
        return "Team";
      case "category":
        return "Category";
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <div
      className={`flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 ${className}`}
      data-testid={testId || "active-filters"}
    >
      <div className="mr-2 text-sm font-medium text-indigo-600 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
        Active filters:
      </div>

      {filters.map((filter, index) => {
        const colorClasses = getFilterColorClasses(filter.type);

        return (
          <FilterTag
            key={`${filter.type}-${index}`}
            label={renderFilterLabel(filter.type)}
            value={filter.value}
            bgColorClass={colorClasses.bg}
            textColorClass={colorClasses.text}
            onRemove={() => onRemoveFilter(filter.type)}
          />
        );
      })}

      <button
        onClick={onClearAll}
        className="ml-auto text-sm text-gray-500 hover:text-indigo-600 hover:underline focus:outline-none transition-colors duration-150 flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Clear all filters
      </button>
    </div>
  );
};

export default ActiveFilters;
