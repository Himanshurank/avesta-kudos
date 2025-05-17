import React from "react";
import StatusBadge from "@/components/atoms/StatusBadge";
import ActionButtons from "@/components/molecules/ActionButtons";

interface UserRequestProps {
  id: number;
  name: string;
  email: string;
  requestedRole: string;
  department: string;
  registeredAt: string;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  className?: string;
}

const UserRequestRow: React.FC<UserRequestProps> = ({
  id,
  name,
  email,
  requestedRole,
  department,
  registeredAt,
  onApprove,
  onReject,
  className = "",
}) => {
  return (
    <tr className={`hover:bg-gray-50 ${className}`}>
      <td className="py-3 px-4 text-gray-800">{name}</td>
      <td className="py-3 px-4 text-gray-800">{email}</td>
      <td className="py-3 px-4">
        <StatusBadge status={requestedRole} type="role" />
      </td>
      <td className="py-3 px-4 text-gray-800">{department}</td>
      <td className="py-3 px-4 text-gray-600">{registeredAt}</td>
      <td className="py-3 px-4">
        <ActionButtons
          onApprove={() => onApprove(id)}
          onReject={() => onReject(id)}
        />
      </td>
    </tr>
  );
};

export default UserRequestRow;
