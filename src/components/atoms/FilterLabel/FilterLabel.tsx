import React from "react";

interface IProps {
  icon?: React.ReactNode;
  label: string;
  className?: string;
  testId?: string;
}

const FilterLabel = (props: IProps) => {
  const { icon, label, className = "", testId } = props;

  return (
    <label
      className={`block text-sm font-medium text-gray-700 mb-1 flex items-center ${className}`}
      data-testid={testId || "filter-label"}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {label}
    </label>
  );
};

export default FilterLabel;
