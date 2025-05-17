import React from "react";

interface TimeRangeOption {
  value: string;
  label: string;
}

interface TimeRangeSelectorProps {
  options: TimeRangeOption[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  options,
  selectedValue,
  onChange,
  className = "",
}) => {
  return (
    <div
      className={`flex space-x-2 bg-white p-1 rounded-lg shadow-sm ${className}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedValue === option.value
              ? "bg-indigo-100 text-indigo-800"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimeRangeSelector;
