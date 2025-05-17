import React from "react";
import { motion } from "framer-motion";
import ApprovalQueueHeader from "@/components/molecules/ApprovalQueueHeader";
import ApprovalQueueTable from "@/components/organisms/ApprovalQueueTable";

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
}

const ApprovalQueueTemplate: React.FC<ApprovalQueueTemplateProps> = ({
  pendingUsers,
  onApprove,
  onReject,
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

        <ApprovalQueueTable
          users={pendingUsers}
          onApprove={onApprove}
          onReject={onReject}
        />
      </motion.div>
    </div>
  );
};

export default ApprovalQueueTemplate;
