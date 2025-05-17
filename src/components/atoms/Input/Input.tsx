import React, { forwardRef } from 'react';

interface InputProps {
  /**
   * Input type
   */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Input value
   */
  value?: string;
  /**
   * Default value
   */
  defaultValue?: string;
  /**
   * onChange handler
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * onBlur handler
   */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * onFocus handler
   */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /**
   * onKeyDown handler
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Is the input disabled?
   */
  disabled?: boolean;
  /**
   * Is the input required?
   */
  required?: boolean;
  /**
   * Input name
   */
  name?: string;
  /**
   * Input id
   */
  id?: string;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Error message
   */
  error?: string;
  /**
   * Is the input read only?
   */
  readOnly?: boolean;
  /**
   * Test ID for testing
   */
  testId?: string;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Icon position
   */
  iconPosition?: 'left' | 'right';
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    type = 'text',
    placeholder,
    value,
    defaultValue,
    onChange,
    onBlur,
    onFocus,
    onKeyDown,
    disabled = false,
    required = false,
    name,
    id,
    className = '',
    error,
    readOnly = false,
    testId = 'input',
    icon,
    iconPosition = 'left',
  } = props;

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onFocus) onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(event);
  };

  // Base classes for styling
  const baseClasses = 'w-full px-4 py-2 rounded-md border text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all';
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300';
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : 'bg-white';
  const iconClasses = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : '';
  const searchClasses = type === 'search' ? 'focus:border-indigo-500 hover:border-gray-400' : '';

  return (
    <div className="relative w-full">
      {icon && iconPosition === 'left' && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        disabled={disabled}
        readOnly={readOnly}
        required={required}
        data-testid={testId}
        className={`${baseClasses} ${errorClasses} ${disabledClasses} ${iconClasses} ${searchClasses} ${className}`}
      />
      {icon && iconPosition === 'right' && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
          {icon}
        </div>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600" data-testid={`${testId}-error`}>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 