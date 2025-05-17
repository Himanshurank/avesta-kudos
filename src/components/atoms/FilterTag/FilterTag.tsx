import React from "react";

interface IProps {
  label: string;
  value: string;
  bgColorClass?: string;
  textColorClass?: string;
  onRemove: () => void;
  className?: string;
  testId?: string;
}

const FilterTag = (props: IProps) => {
  const {
    label,
    value,
    bgColorClass = "bg-indigo-100",
    textColorClass = "text-indigo-800",
    onRemove,
    className = "",
    testId,
  } = props;

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${bgColorClass} ${textColorClass} shadow-sm transition-all duration-150 hover:bg-opacity-80 ${className}`}
      data-testid={testId || "filter-tag"}
    >
      {label}: {value}
      <button
        onClick={onRemove}
        className={`ml-1.5 inline-flex items-center justify-center rounded-full h-4 w-4 ${textColorClass.replace(
          "800",
          "400"
        )} hover:${bgColorClass.replace(
          "100",
          "200"
        )} hover:${textColorClass.replace("800", "600")} focus:outline-none`}
        aria-label={`Remove ${label} filter`}
      >
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </span>
  );
};

export default FilterTag;
