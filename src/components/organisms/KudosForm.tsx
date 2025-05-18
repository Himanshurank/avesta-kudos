import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import FormField from "@/components/molecules/FormField";
import CustomDropdown, {
  DropdownOption,
} from "@/components/molecules/CustomDropdown";
import {
  CATEGORY_LABELS,
  TeamValue,
  CategoryValue,
  FormErrors,
  FormLabels,
  FormPlaceholders,
  ButtonLabels,
  KudosText,
} from "@/shared/enums";

interface KudosFormData {
  recipientName: string;
  teamName: TeamValue;
  category: CategoryValue;
  message: string;
}

interface KudosFormProps {
  /**
   * Initial form data
   */
  initialData?: Partial<KudosFormData>;
  /**
   * Submit handler
   */
  onSubmit: (data: KudosFormData) => void;
  /**
   * Cancel handler
   */
  onCancel?: () => void;
  /**
   * Whether form is being submitted
   */
  isSubmitting?: boolean;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Test ID for testing
   */
  testId?: string;
}

// Category options
const categoryOptions: DropdownOption<CategoryValue>[] = Object.values(
  CategoryValue
).map((value) => ({
  value,
  label: CATEGORY_LABELS[value],
  icon: CATEGORY_LABELS[value].split(" ")[0],
}));

const KudosForm = (props: KudosFormProps) => {
  const {
    initialData = {},
    onSubmit,
    onCancel,
    isSubmitting = false,
    className = "",
    testId = "kudos-form",
  } = props;

  const [formData, setFormData] = useState<KudosFormData>({
    recipientName: initialData.recipientName || "",
    teamName: initialData.teamName || ("" as TeamValue),
    category: initialData.category || ("" as CategoryValue),
    message: initialData.message || "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof KudosFormData, string>>
  >({});
  const [messageCount, setMessageCount] = useState(formData.message.length);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof KudosFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    if (name === "message") {
      setMessageCount(value.length);
    }
  };

  const handleDropdownChange = (
    name: "teamName" | "category",
    value: TeamValue | CategoryValue
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof KudosFormData, string>> = {};
    let isValid = true;

    if (!formData.recipientName.trim()) {
      newErrors.recipientName = FormErrors.RECIPIENT_NAME_REQUIRED;
      isValid = false;
    }

    if (!formData.teamName) {
      newErrors.teamName = FormErrors.TEAM_REQUIRED;
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = FormErrors.CATEGORY_REQUIRED;
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = FormErrors.MESSAGE_REQUIRED;
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = FormErrors.MESSAGE_TOO_SHORT;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  // Custom renderer for category options
  const renderCategoryOption = (
    option: DropdownOption<CategoryValue>,
    isSelected: boolean
  ) => (
    <div
      className={`px-4 py-2 cursor-pointer hover:bg-indigo-50 flex items-center ${
        isSelected ? "bg-indigo-100 text-indigo-800" : "text-gray-700"
      }`}
    >
      <span className="mr-2 text-lg">{option.icon}</span>
      <span>{option.label.replace(/^[^ ]+ /, "")}</span>
    </div>
  );

  return (
    <Card
      className={`overflow-hidden ${className}`}
      testId={testId}
      elevation="md"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16">
          <div className="absolute w-full h-full rounded-full bg-white opacity-10"></div>
        </div>
        <div className="relative">
          <Typography variant="h4" bold color="white">
            {KudosText.TITLE}
          </Typography>
          <Typography variant="body2" color="white" className="mt-2">
            {KudosText.SUBTITLE}
          </Typography>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        <div>
          <FormField
            id="recipientName"
            label={FormLabels.RECIPIENT_NAME}
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            placeholder={FormPlaceholders.RECIPIENT_NAME}
            required
            error={errors.recipientName}
            testId={`${testId}-recipient`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomDropdown
            id="category"
            name="category"
            label={FormLabels.CATEGORY}
            value={formData.category}
            options={categoryOptions}
            onChange={(value) =>
              handleDropdownChange("category", value as CategoryValue)
            }
            placeholder={FormPlaceholders.CATEGORY}
            required
            error={errors.category}
            renderOption={renderCategoryOption}
            testId={`${testId}-category`}
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {FormLabels.MESSAGE} <span className="text-indigo-600">*</span>
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30 transition-all duration-200 outline-none"
              placeholder={FormPlaceholders.MESSAGE}
              required
              maxLength={500}
              data-testid={`${testId}-message`}
            />
            <div
              className={`absolute bottom-3 right-3 text-xs px-2 py-1 rounded-full ${
                messageCount > 400
                  ? "bg-amber-100 text-amber-800"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {messageCount}/500
            </div>
          </div>
          {errors.message && (
            <Typography variant="caption" color="error" className="mt-1">
              {errors.message}
            </Typography>
          )}
        </div>

        <div className="border-t border-gray-100 pt-8 flex justify-end space-x-4">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              testId={`${testId}-cancel`}
            >
              {ButtonLabels.CANCEL}
            </Button>
          )}
          <Button
            variant="primary"
            type="submit"
            disabled={isSubmitting}
            testId={`${testId}-submit`}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
          >
            {isSubmitting ? ButtonLabels.SENDING : ButtonLabels.SUBMIT}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default KudosForm;
