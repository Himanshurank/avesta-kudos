import React from "react";

interface StatusBadgeProps {
  status: string;
  type?: "role" | "approval";
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type = "role",
  className = "",
}) => {
  let bgColor = "bg-green-100";
  let textColor = "text-green-800";

  if (type === "role") {
    if (status === "Admin") {
      bgColor = "bg-indigo-100";
      textColor = "text-indigo-800";
    } else {
      bgColor = "bg-blue-100";
      textColor = "text-blue-800";
    }
  } else if (type === "approval") {
    if (status === "Pending") {
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-800";
    } else if (status === "Rejected") {
      bgColor = "bg-red-100";
      textColor = "text-red-800";
    }
  }

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
