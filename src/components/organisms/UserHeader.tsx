import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserGroupIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import ActionButton from "@/components/atoms/ActionButton";
import UserSearch from "@/components/molecules/UserSearch";
import UserFilters from "@/components/molecules/UserFilters";

interface UserHeaderProps {
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedRole: string;
  selectedStatus: string;
  onRoleFilter: (role: string) => void;
  onStatusFilter: (status: string) => void;
  showFilters: boolean;
  toggleFilters: () => void;
  onAddUser: () => void;
  onExportUsers: () => void;
  className?: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({
  searchTerm,
  onSearch,
  selectedRole,
  selectedStatus,
  onRoleFilter,
  onStatusFilter,
  showFilters,
  toggleFilters,
  onAddUser,
  onExportUsers,
  className = "",
}) => {
  return (
    <div
      className={`p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white ${className}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
            <UserGroupIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-black">User Management</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <ActionButton
            icon={<AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />}
            text="Filters"
            onClick={toggleFilters}
            variant="secondary"
          />
          <ActionButton
            icon={<ArrowDownTrayIcon className="w-5 h-5 mr-2" />}
            text="Export"
            onClick={onExportUsers}
            variant="secondary"
          />
          <ActionButton
            icon={<PlusCircleIcon className="w-5 h-5 mr-2" />}
            text="Add User"
            onClick={onAddUser}
            variant="primary"
          />
        </div>
      </div>

      <UserSearch searchTerm={searchTerm} onSearch={onSearch} />

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <UserFilters
              selectedRole={selectedRole}
              selectedStatus={selectedStatus}
              onRoleFilter={onRoleFilter}
              onStatusFilter={onStatusFilter}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserHeader;
