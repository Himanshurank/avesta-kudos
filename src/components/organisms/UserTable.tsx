import React from "react";
import { AnimatePresence } from "framer-motion";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import UserTableRow from "@/components/molecules/UserTableRow";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  team?: string;
}

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  error: string | null;
  onEditUser: (userId: number) => void;
  onDeleteUser: (userId: number) => void;
  onManageRoles: (userId: number) => void;
  onTryAgain: () => void;
  className?: string;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  isLoading,
  error,
  onEditUser,
  onDeleteUser,
  onManageRoles,
  onTryAgain,
  className = "",
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center">
          <div className="text-red-500 mb-2">{error}</div>
          <button
            onClick={onTryAgain}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            data-testid="try-again-button"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <table className={`w-full ${className}`}>
      <thead className="bg-gradient-to-r from-indigo-50 to-white">
        <tr>
          <th className="py-3.5 px-4 text-left text-black font-semibold">
            Name
          </th>
          <th className="py-3.5 px-4 text-left text-black font-semibold">
            Email
          </th>
          <th className="py-3.5 px-4 text-left text-black font-semibold">
            Team
          </th>
          <th className="py-3.5 px-4 text-left text-black font-semibold">
            Role
          </th>
          <th className="py-3.5 px-4 text-left text-black font-semibold">
            Status
          </th>
          <th className="py-3.5 px-4 text-left text-black font-semibold">
            Created
          </th>
          <th className="py-3.5 px-4 text-left text-black font-semibold">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        <AnimatePresence>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onEdit={onEditUser}
              onDelete={onDeleteUser}
              onManageRoles={onManageRoles}
            />
          ))}
        </AnimatePresence>

        {users.length === 0 && (
          <tr>
            <td colSpan={7} className="py-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <UserGroupIcon className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-black font-medium">No users found</p>
                <p className="text-slate-500 text-sm mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
