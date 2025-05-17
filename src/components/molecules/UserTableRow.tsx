import React from "react";
import { motion } from "framer-motion";
import {
  PencilSquareIcon,
  UserCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import StatusBadge from "@/components/atoms/StatusBadge";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface UserTableRowProps {
  user: User;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onManageRoles: (id: number) => void;
  className?: string;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onEdit,
  onDelete,
  onManageRoles,
  className = "",
}) => {
  return (
    <motion.tr
      className={`hover:bg-indigo-50/30 transition-colors ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      data-testid={`user-row-${user.id}`}
    >
      <td className="py-4 px-4 text-black">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
            <span className="text-indigo-700 font-semibold">
              {user.name.charAt(0)}
            </span>
          </div>
          {user.name}
        </div>
      </td>
      <td className="py-4 px-4 text-black">{user.email}</td>
      <td className="py-4 px-4">
        <StatusBadge status={user.role} type="role" />
      </td>
      <td className="py-4 px-4">
        <StatusBadge status={user.status} type="approval" />
      </td>
      <td className="py-4 px-4 text-slate-600">{user.createdAt}</td>
      <td className="py-4 px-4">
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(user.id)}
            className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-lg hover:bg-indigo-50"
            title="Edit User"
            data-testid={`edit-user-${user.id}`}
          >
            <PencilSquareIcon className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onManageRoles(user.id)}
            className="text-blue-600 hover:text-blue-900 p-1.5 rounded-lg hover:bg-blue-50"
            title="Manage Roles"
            data-testid={`manage-roles-${user.id}`}
          >
            <UserCircleIcon className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(user.id)}
            className="text-red-600 hover:text-red-900 p-1.5 rounded-lg hover:bg-red-50"
            title="Delete User"
            data-testid={`delete-user-${user.id}`}
          >
            <TrashIcon className="w-5 h-5" />
          </motion.button>
        </div>
      </td>
    </motion.tr>
  );
};

export default UserTableRow;
