import React from "react";

interface EmptyQueueMessageProps {
  className?: string;
}

const EmptyQueueMessage: React.FC<EmptyQueueMessageProps> = ({
  className = "",
}) => {
  return (
    <div className={`bg-gray-50 rounded-lg p-8 text-center ${className}`}>
      <div className="text-6xl mb-4">✅</div>
      <h3 className="text-xl font-medium text-gray-700 mb-2">All caught up!</h3>
      <p className="text-gray-600">
        There are no pending user registrations to review.
      </p>
    </div>
  );
};

export default EmptyQueueMessage;
