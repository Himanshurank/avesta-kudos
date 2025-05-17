import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  testId?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type = "text",
    placeholder,
    className = "",
    error,
    testId,
    ...restProps
  } = props;

  return (
    <div className="w-full">
      <input
        ref={ref}
        type={type}
        className={`
          w-full px-3 py-2 bg-white border rounded-md shadow-sm
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500
          focus:border-indigo-500 text-gray-900
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
        `}
        placeholder={placeholder}
        data-testid={testId || "input"}
        {...restProps}
      />
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
