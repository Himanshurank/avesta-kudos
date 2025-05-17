import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/core/application/context/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserGroupIcon,
  PlusCircleIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  UserCircleIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

// Define interfaces
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

const UserManagementPage = () => {
  // Initialize state
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("user-management");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      createdAt: "2023-01-15",
    },
    {
      id: 2,
      name: "Sarah Jones",
      email: "sarah@example.com",
      role: "User",
      status: "Active",
      createdAt: "2023-02-20",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      role: "User",
      status: "Active",
      createdAt: "2023-03-10",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      role: "Admin",
      status: "Active",
      createdAt: "2023-04-05",
    },
  ]);

  // Define helper functions
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
  };

  const handleDeleteUser = (userId: number) => {
    toast.success(`User deleted successfully`);
    setUsers(users.filter((u) => u.id !== userId));
  };

  const handleEditUser = (userId: number) => {
    toast.success(`Edit user modal would open for user ID: ${userId}`);
  };

  const handleManageRoles = (userId: number) => {
    toast.success(`Role management modal would open for user ID: ${userId}`);
  };

  const handleAddUser = () => {
    toast.success("Add user modal would open");
  };

  const handleExportUsers = () => {
    toast.success("Users data would be exported");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Create filtered users list
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === "All" || user.status === selectedStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Authorization check
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to access the dashboard");
      router.push("/auth/login");
      return;
    }

    if (
      !loading &&
      user &&
      !(user.roles && user.roles.some((role) => role.name === "SUPER_ADMIN"))
    ) {
      toast.error("You don't have permission to access this page");
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Loading state
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Return JSX structure
  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      user={user}
    >
      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mr-4">
                  <UserGroupIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <h1 className="text-2xl font-bold text-black">
                  User Management
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={toggleFilters}
                  className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-black rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                  Filters
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleExportUsers}
                  className="inline-flex items-center px-4 py-2 bg-white border border-slate-200 text-black rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  Export
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddUser}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
                >
                  <PlusCircleIcon className="w-5 h-5 mr-2" />
                  Add User
                </motion.button>
              </div>
            </div>

            <div className="mt-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search users by name or email..."
                className="block w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black shadow-sm"
              />
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Role
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["All", "Admin", "User", "Super Admin"].map(
                            (role) => (
                              <button
                                key={role}
                                onClick={() => handleRoleFilter(role)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                                  selectedRole === role
                                    ? "bg-indigo-600 text-white"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                }`}
                              >
                                {role}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Status
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {["All", "Active", "Inactive"].map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusFilter(status)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                                selectedStatus === status
                                  ? "bg-indigo-600 text-white"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-50 to-white">
                <tr>
                  <th className="py-3.5 px-4 text-left text-black font-semibold">
                    Name
                  </th>
                  <th className="py-3.5 px-4 text-left text-black font-semibold">
                    Email
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
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      className="hover:bg-indigo-50/30 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
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
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium inline-flex items-center ${
                            user.role === "Admin"
                              ? "bg-indigo-100 text-indigo-800"
                              : user.role === "Super Admin"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role === "Admin" && (
                            <UserCircleIcon className="w-3.5 h-3.5 mr-1" />
                          )}
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        {user.createdAt}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditUser(user.id)}
                            className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-lg hover:bg-indigo-50"
                            title="Edit User"
                          >
                            <PencilSquareIcon className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleManageRoles(user.id)}
                            className="text-blue-600 hover:text-blue-900 p-1.5 rounded-lg hover:bg-blue-50"
                            title="Manage Roles"
                          >
                            <UserCircleIcon className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 p-1.5 rounded-lg hover:bg-red-50"
                            title="Delete User"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center">
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
          </div>

          <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-slate-600 font-medium">
              Showing {filteredUsers.length} of {users.length} users
            </div>
            <div className="flex items-center space-x-2">
              <button
                disabled
                className="flex items-center px-3 py-2 bg-white border border-slate-200 text-slate-400 rounded-lg cursor-not-allowed"
              >
                <ChevronLeftIcon className="w-4 h-4 mr-1" />
                Previous
              </button>
              <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg font-medium">
                1
              </button>
              <button
                disabled
                className="flex items-center px-3 py-2 bg-white border border-slate-200 text-slate-400 rounded-lg cursor-not-allowed"
              >
                Next
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagementPage;
