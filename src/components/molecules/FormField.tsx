import React, { forwardRef } from "react";
import Label from "../atoms/Label";
import Input from "../atoms/Input";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  testId?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>((props, ref) => {
  const {
    id,
    label,
    error,
    required = false,
    className = "",
    testId,
    ...inputProps
  } = props;

  return (
    <div className={`mb-4 ${className}`} data-testid={testId || "form-field"}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input
        ref={ref}
        id={id}
        error={error}
        required={required}
        aria-required={required}
        {...inputProps}
      />
    </div>
  );
});

FormField.displayName = "FormField";

export default FormField;
