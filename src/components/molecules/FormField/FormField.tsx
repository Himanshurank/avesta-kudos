import React, { forwardRef } from 'react';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';

interface FormFieldProps {
  /**
   * Field label
   */
  label: string;
  /**
   * Field name
   */
  name: string;
  /**
   * Field id
   */
  id?: string;
  /**
   * Field type
   */
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  /**
   * Field placeholder
   */
  placeholder?: string;
  /**
   * Field value
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
   * Is the field disabled?
   */
  disabled?: boolean;
  /**
   * Is the field required?
   */
  required?: boolean;
  /**
   * Error message
   */
  error?: string;
  /**
   * Help text
   */
  helperText?: string;
  /**
   * Additional className for the field container
   */
  className?: string;
  /**
   * Additional className for the input
   */
  inputClassName?: string;
  /**
   * Additional className for the label
   */
  labelClassName?: string;
  /**
   * Icon to display
   */
  icon?: React.ReactNode;
  /**
   * Icon position
   */
  iconPosition?: 'left' | 'right';
  /**
   * Test ID for testing
   */
  testId?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>((props, ref) => {
  const {
    label,
    name,
    id,
    type = 'text',
    placeholder,
    value,
    defaultValue,
    onChange,
    onBlur,
    disabled = false,
    required = false,
    error,
    helperText,
    className = '',
    inputClassName = '',
    labelClassName = '',
    icon,
    iconPosition,
    testId = 'form-field',
  } = props;

  const fieldId = id || name;

  return (
    <div className={`mb-4 ${className}`} data-testid={testId}>
      <Typography
        component="label"
        variant="body2"
        className={`block mb-1 font-medium text-gray-700 ${labelClassName}`}
        testId={`${testId}-label`}
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </Typography>

      <Input
        ref={ref}
        type={type}
        id={fieldId}
        name={name}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        error={error}
        className={inputClassName}
        icon={icon}
        iconPosition={iconPosition}
        testId={`${testId}-input`}
      />

      {helperText && !error && (
        <Typography
          variant="caption"
          className="mt-1 text-gray-500"
          testId={`${testId}-helper`}
        >
          {helperText}
        </Typography>
      )}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField; 