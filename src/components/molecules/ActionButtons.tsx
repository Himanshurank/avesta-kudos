import React from "react";

interface ActionButtonsProps {
  onApprove: () => void;
  onReject: () => void;
  className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onApprove,
  onReject,
  className = "",
}) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      <button
        onClick={onApprove}
        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Approve
      </button>
      <button
        onClick={onReject}
        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Reject
      </button>
    </div>
  );
};

export default ActionButtons;
