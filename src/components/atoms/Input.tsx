import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  testId?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type = "text",
    placeholder,
    className = "",
    error,
    testId,
    icon,
    iconPosition = "right",
    ...restProps
  } = props;

  return (
    <div className="w-full relative">
      <input
        ref={ref}
        type={type}
        className={`
          w-full px-3 py-2 bg-white border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500
          focus:border-indigo-500 text-gray-900
          ${error ? "border-red-500" : "border-gray-300"}
          ${icon && iconPosition === "left" ? "pl-10" : ""}
          ${icon && iconPosition === "right" ? "pr-10" : ""}
          ${className}
        `}
        placeholder={placeholder}
        data-testid={testId || "input"}
        {...restProps}
      />
      {icon && (
        <div
          className={`absolute inset-y-0 ${
            iconPosition === "left" ? "left-0 pl-3" : "right-0 pr-3"
          } flex items-center pointer-events-none`}
        >
          {icon}
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600" data-testid="input-error">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
