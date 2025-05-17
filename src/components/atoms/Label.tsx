import React from "react";

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
  testId?: string;
}

const Label = (props: LabelProps) => {
  const { htmlFor, children, className = "", required = false, testId } = props;

  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
      data-testid={testId || "label"}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
