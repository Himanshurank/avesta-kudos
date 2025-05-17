import React, { useState, useRef, useEffect, ReactNode } from "react";
import Typography from "@/components/atoms/Typography";

export interface DropdownOption<T extends string = string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

interface CustomDropdownProps<T extends string = string> {
  /**
   * The currently selected value
   */
  value: T;
  /**
   * Available options for the dropdown
   */
  options: DropdownOption<T>[];
  /**
   * Function called when an option is selected
   */
  onChange: (value: T) => void;
  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;
  /**
   * CSS class name for additional styling
   */
  className?: string;
  /**
   * Label for the dropdown
   */
  label?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * ID for the input element
   */
  id?: string;
  /**
   * Name for the input element
   */
  name?: string;
  /**
   * Custom renderer for dropdown options
   */
  renderOption?: (option: DropdownOption<T>, isSelected: boolean) => ReactNode;
  /**
   * Test ID for testing
   */
  testId?: string;
}

function CustomDropdown<T extends string = string>({
  value,
  options,
  onChange,
  placeholder = "Select an option",
  className = "",
  label,
  required = false,
  error,
  id,
  name,
  renderOption,
  testId,
}: CustomDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (selectedValue: T) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  const defaultRenderOption = (option: DropdownOption<T>, isSelected: boolean) => (
    <div
      className={`px-4 py-2 cursor-pointer hover:bg-indigo-50 flex items-center ${
        isSelected ? 'bg-indigo-100 text-indigo-800' : 'text-gray-700'
      }`}
    >
      {option.icon && <span className="mr-2">{option.icon}</span>}
      <span>{option.label}</span>
    </div>
  );

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="text-indigo-600">*</span>}
        </label>
      )}
      <div className="relative" ref={dropdownRef}>
        <div
          className={`w-full px-4 py-3 rounded-xl border ${
            isOpen ? 'border-indigo-400 ring ring-indigo-200 ring-opacity-30' : 'border-gray-200'
          } bg-white flex items-center justify-between cursor-pointer hover:border-indigo-400 transition-all duration-200`}
          onClick={() => setIsOpen(!isOpen)}
          data-testid={testId}
        >
          <span className={value ? 'text-gray-800' : 'text-gray-400'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="text-indigo-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-xl shadow-lg border border-gray-200 py-1 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <div key={option.value} onClick={() => handleSelect(option.value)}>
                {renderOption 
                  ? renderOption(option, option.value === value)
                  : defaultRenderOption(option, option.value === value)
                }
              </div>
            ))}
          </div>
        )}

        <input
          type="hidden"
          id={id}
          name={name}
          value={value}
          required={required}
        />
      </div>
      {error && (
        <Typography variant="caption" color="error" className="mt-1">
          {error}
        </Typography>
      )}
    </div>
  );
}

export default CustomDropdown; 