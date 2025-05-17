import React from "react";

interface UserFilterProps {
  selectedRole: string;
  selectedStatus: string;
  onRoleFilter: (role: string) => void;
  onStatusFilter: (status: string) => void;
  className?: string;
}

const UserFilters: React.FC<UserFilterProps> = ({
  selectedRole,
  selectedStatus,
  onRoleFilter,
  onStatusFilter,
  className = "",
}) => {
  const roles = ["All", "Admin", "User", "Super Admin"];
  const statuses = ["All", "Approved", "Pending", "Rejected"];

  return (
    <div
      className={`mt-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Role
          </label>
          <div className="flex flex-wrap gap-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => onRoleFilter(role)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  selectedRole === role
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                data-testid={`role-filter-${role
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => onStatusFilter(status)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                  selectedStatus === status
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                data-testid={`status-filter-${status.toLowerCase()}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;
