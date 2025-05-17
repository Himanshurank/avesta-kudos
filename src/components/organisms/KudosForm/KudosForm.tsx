import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import FormField from '@/components/molecules/FormField';

interface KudosFormData {
  recipientName: string;
  teamName: string;
  category: string;
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
const categoryOptions = [
  { value: 'teamwork', label: '👥 Teamwork' },
  { value: 'innovation', label: '💡 Innovation' },
  { value: 'helping_hand', label: '🤝 Helping Hand' },
  { value: 'leadership', label: '🏆 Leadership' },
  { value: 'excellence', label: '⭐ Excellence' },
];

// Team options
const teamOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'product', label: 'Product' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'customer_success', label: 'Customer Success' },
];

const KudosForm = (props: KudosFormProps) => {
  const {
    initialData = {},
    onSubmit,
    onCancel,
    isSubmitting = false,
    className = '',
    testId = 'kudos-form',
  } = props;

  const [formData, setFormData] = useState<KudosFormData>({
    recipientName: initialData.recipientName || '',
    teamName: initialData.teamName || '',
    category: initialData.category || '',
    message: initialData.message || '',
  });

  const [errors, setErrors] = useState<Partial<KudosFormData>>({});
  const [messageCount, setMessageCount] = useState(formData.message.length);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

    if (name === 'message') {
      setMessageCount(value.length);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<KudosFormData> = {};
    let isValid = true;

    if (!formData.recipientName.trim()) {
      newErrors.recipientName = 'Recipient name is required';
      isValid = false;
    }

    if (!formData.teamName) {
      newErrors.teamName = 'Team is required';
      isValid = false;
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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

  return (
    <Card
      className={`overflow-hidden ${className}`}
      testId={testId}
      elevation="md"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <Typography variant="h4" bold color="white">
          Give Kudos
        </Typography>
        <Typography variant="body2" color="white">
          Recognize someone&apos;s great work and spread positivity
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FormField
            label="Recipient Name"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            placeholder="Who are you recognizing?"
            required
            error={errors.recipientName}
            testId={`${testId}-recipient`}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-4">
              <label htmlFor="teamName" className="block mb-1 font-medium text-gray-700">
                <Typography
                  variant="body2"
                  className="inline"
                >
                  Team <span className="text-red-500">*</span>
                </Typography>
              </label>
              
              <select
                id="teamName"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                data-testid={`${testId}-team`}
              >
                <option value="" disabled>
                  Select a team
                </option>
                {teamOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {errors.teamName && (
                <Typography variant="caption" color="error" className="mt-1">
                  {errors.teamName}
                </Typography>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-4">
              <label htmlFor="category" className="block mb-1 font-medium text-gray-700">
                <Typography
                  variant="body2"
                  className="inline"
                >
                  Category <span className="text-red-500">*</span>
                </Typography>
              </label>
              
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
                data-testid={`${testId}-category`}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              {errors.category && (
                <Typography variant="caption" color="error" className="mt-1">
                  {errors.category}
                </Typography>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="mb-1">
            <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
              <Typography
                variant="body2"
                className="inline"
              >
                Message <span className="text-red-500">*</span>
              </Typography>
            </label>
            
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              placeholder="What do you appreciate about them? Be specific about their contribution..."
              required
              data-testid={`${testId}-message`}
            />
            
            <div className="flex justify-between items-center mt-1">
              {errors.message ? (
                <Typography variant="caption" color="error">
                  {errors.message}
                </Typography>
              ) : (
                <Typography
                  variant="caption"
                  color={messageCount > 500 ? 'error' : 'secondary'}
                >
                  {messageCount}/500 characters
                </Typography>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end gap-4 pt-4 border-t border-gray-100"
        >
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              testId={`${testId}-cancel`}
            >
              Cancel
            </Button>
          )}
          
          <Button
            type="submit"
            disabled={isSubmitting}
            testId={`${testId}-submit`}
          >
            {isSubmitting ? 'Sending...' : 'Send Kudos'}
          </Button>
        </motion.div>
      </form>
    </Card>
  );
};

export default KudosForm; 