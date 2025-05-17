import React from "react";

interface ApprovalQueueHeaderProps {
  pendingCount: number;
  className?: string;
}

const ApprovalQueueHeader: React.FC<ApprovalQueueHeaderProps> = ({
  pendingCount,
  className = "",
}) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Approval Queue</h1>
        <p className="text-gray-600 mt-1">
          Manage pending user registration requests
        </p>
      </div>
      <div className="bg-yellow-100 px-4 py-2 rounded-md">
        <span className="text-yellow-800 font-medium">
          {pendingCount} Pending {pendingCount === 1 ? "Request" : "Requests"}
        </span>
      </div>
    </div>
  );
};

export default ApprovalQueueHeader;
