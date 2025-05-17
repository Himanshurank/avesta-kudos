import React from "react";
import FilterLabel from "@/components/atoms/FilterLabel/FilterLabel";

interface IProps {
  label: string;
  icon: React.ReactNode;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
  testId?: string;
}

const FilterDropdown = (props: IProps) => {
  const {
    label,
    icon,
    value,
    options,
    onChange,
    className = "",
    testId,
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div
      className={`flex-1 transform transition duration-200 hover:scale-[1.02] ${className}`}
      data-testid={testId || "filter-dropdown"}
    >
      <FilterLabel label={label} icon={icon} />
      <div className="relative rounded-md shadow-sm">
        <select
          id={label.toLowerCase()}
          className="block w-full pl-3 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200 hover:border-indigo-300"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-indigo-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
