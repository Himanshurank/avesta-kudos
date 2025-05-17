import React from "react";
import UserRequestRow from "@/components/molecules/UserRequestRow";
import EmptyQueueMessage from "@/components/molecules/EmptyQueueMessage";

interface PendingUser {
  id: number;
  name: string;
  email: string;
  requestedRole: string;
  department: string;
  registeredAt: string;
}

interface ApprovalQueueTableProps {
  users: PendingUser[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  className?: string;
}

const ApprovalQueueTable: React.FC<ApprovalQueueTableProps> = ({
  users,
  onApprove,
  onReject,
  className = "",
}) => {
  if (users.length === 0) {
    return <EmptyQueueMessage />;
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
              Name
            </th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
              Email
            </th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
              Requested Role
            </th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
              Department
            </th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
              Registered
            </th>
            <th className="py-3 px-4 text-left text-gray-600 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <UserRequestRow
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              requestedRole={user.requestedRole}
              department={user.department}
              registeredAt={user.registeredAt}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovalQueueTable;
