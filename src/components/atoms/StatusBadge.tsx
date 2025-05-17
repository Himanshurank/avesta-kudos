import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

interface StatusBadgeProps {
  status: string;
  type: "role" | "approval";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type,
  className = "",
}) => {
  let colorClasses = "";
  let icon = null;

  if (type === "role") {
    if (status.includes("Admin")) {
      colorClasses = "bg-indigo-100 text-indigo-800";
      icon = <UserCircleIcon className="w-3.5 h-3.5 mr-1" />;
    } else if (status.includes("Super")) {
      colorClasses = "bg-purple-100 text-purple-800";
    } else {
      colorClasses = "bg-blue-100 text-blue-800";
    }
  } else {
    if (status === "Approved") {
      colorClasses = "bg-green-100 text-green-800";
    } else if (status === "Pending") {
      colorClasses = "bg-yellow-100 text-yellow-800";
    } else {
      colorClasses = "bg-red-100 text-red-800";
    }
  }

  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center ${colorClasses} ${className}`}
    >
      {icon}
      {status}
    </span>
  );
};

export default StatusBadge;
