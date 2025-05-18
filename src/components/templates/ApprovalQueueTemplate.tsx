import React from "react";
import { motion } from "framer-motion";
import ApprovalQueueHeader from "@/components/molecules/ApprovalQueueHeader";
import ApprovalQueueTable from "@/components/organisms/ApprovalQueueTable";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

interface PendingUser {
  id: number;
  name: string;
  email: string;
  requestedRole: string;
  department: string;
  registeredAt: string;
}

interface ApprovalQueueTemplateProps {
  pendingUsers: PendingUser[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const ApprovalQueueTemplate: React.FC<ApprovalQueueTemplateProps> = ({
  pendingUsers,
  onApprove,
  onReject,
  isLoading = false,
  error = null,
  onRetry,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <ApprovalQueueHeader
          pendingCount={pendingUsers.length}
          className="mb-6"
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="md" />
            <p className="mt-4 text-gray-500">Loading pending users...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-red-500 mb-4">{error}</div>
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : pendingUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <p>No pending users to approve at this time.</p>
          </div>
        ) : (
          <ApprovalQueueTable
            users={pendingUsers}
            onApprove={onApprove}
            onReject={onReject}
          />
        )}
      </motion.div>
    </div>
  );
};

export default ApprovalQueueTemplate;
