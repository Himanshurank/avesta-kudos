import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/core/application/context/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import AddUserModal, {
  UserFormData,
} from "@/components/molecules/AddUserModal";
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
import { container } from "@/core/shared/di/container";

// Define interfaces
interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Optional since existing users might not have it
  role: string;
  status: string;
  createdAt: string;
}

// Interface for our internal pagination state
interface Pagination {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

const UserManagementPage: React.FC = () => {
  // Initialize state
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("user-management");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    totalItems: 0,
    itemsPerPage: 10,
    currentPage: 1,
    totalPages: 1,
  });

  // Modal states
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users from the API
  const fetchUsers = async (page = 1, limit = 10) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await container.getAllUsersUseCase.execute({
        page,
        limit,
        roleId: selectedRole !== "All" ? getRoleId(selectedRole) : undefined,
        approvalStatus: selectedStatus !== "All" ? selectedStatus : undefined,
      });

      // Check if result and result.users exist before mapping
      if (!result || !result.users || !Array.isArray(result.users)) {
        console.error("API response format is unexpected:", result);
        setError("Received unexpected data format from the server");
        setUsers([]);
        setPagination({
          totalItems: 0,
          itemsPerPage: 10,
          currentPage: 1,
          totalPages: 1,
        });
        return;
      }

      // Map the API response to our User interface
      const mappedUsers = result.users.map((apiUser) => {
        return {
          id: apiUser.id || 0,
          name: apiUser.name || "Unknown",
          email: apiUser.email || "No email",
          role: Array.isArray(apiUser.roles)
            ? apiUser.roles.map((r) => r?.name || "Unknown").join(", ")
            : "No role",
          status: apiUser.approvalStatus || "Unknown",
          createdAt: apiUser.createdAt
            ? new Date(apiUser.createdAt).toISOString().split("T")[0]
            : "Unknown date",
        };
      });

      setUsers(mappedUsers);

      // Set pagination using the data from API, with fallbacks
      setPagination({
        totalItems: result.pagination?.total || 0,
        itemsPerPage: result.pagination?.limit || 10,
        currentPage: result.pagination?.page || 1,
        totalPages: result.pagination?.pages || 1,
      });
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
      toast.error("Failed to load users");
      // Initialize with empty data on error
      setUsers([]);
      setPagination({
        totalItems: 0,
        itemsPerPage: 10,
        currentPage: 1,
        totalPages: 1,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to convert role name to ID
  const getRoleId = (roleName: string | number): number | undefined => {
    switch (roleName) {
      case "Super Admin":
        return 1;
      case "Admin":
        return 2;
      case "User":
        return 3;
    }
  };

  // Load users on component mount and when filters change
  useEffect(() => {
    if (user) {
      fetchUsers(pagination.currentPage, pagination.itemsPerPage);
    }
  }, [user, selectedRole, selectedStatus, pagination.currentPage]);

  // Define helper functions
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
    setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset to first page when changing filters
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setPagination((prev) => ({ ...prev, currentPage: 1 })); // Reset to first page when changing filters
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await container.deleteUserUseCase.execute(userId);
      toast.success("User deleted successfully");
      // Refresh user list
      fetchUsers(pagination.currentPage, pagination.itemsPerPage);
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  const handleEditUser = (userId: number) => {
    // Find the user by ID
    const userToEdit = users.find((u) => u.id === userId);
    if (userToEdit) {
      // Set the selected user and open the edit modal
      setSelectedUser(userToEdit);
      setIsEditUserModalOpen(true);
    } else {
      toast.error("User not found");
    }
  };

  const handleEditUserSubmit = async (
    userId: number,
    userData: UserFormData
  ) => {
    try {
      // Only send password if it's provided (not empty)
      const dataToUpdate: Partial<{
        name: string;
        email: string;
        roleIds: number;
        status: string;
        password?: string;
      }> = {
        name: userData.name,
        email: userData.email,
        roleIds: getRoleId(userData.role as string) || 3,
        status: userData.status,
      };

      if (userData.password.trim()) {
        dataToUpdate.password = userData.password;
      }

      // Call the update API
      await container.updateUserUseCase.execute(userId, dataToUpdate);

      // Refresh the users list
      fetchUsers(pagination.currentPage, pagination.itemsPerPage);

      // Close the modal
      setIsEditUserModalOpen(false);
      setSelectedUser(null);

      // Show success message
      toast.success("User updated successfully");
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
    }
  };

  const handleManageRoles = (userId: number) => {
    toast.success(`Role management modal would open for user ID: ${userId}`);
  };

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleAddUserSubmit = async (userData: UserFormData) => {
    try {
      // Create the user through the API
      await container.createUserUseCase.execute({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        roleIds: getRoleId(userData.role as string) || 3,
      });

      // Refresh user list
      fetchUsers(pagination.currentPage, pagination.itemsPerPage);

      // Close the modal
      setIsAddUserModalOpen(false);

      // Show success message
      toast.success("User added successfully");
    } catch (err) {
      console.error("Error adding user:", err);
      toast.error("Failed to add user");
    }
  };

  const handleExportUsers = () => {
    toast.success("Users data would be exported");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  // Create filtered users list (client-side filtering for search)
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
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
                          {["All", "Approved", "Pending", "Rejected"].map(
                            (status) => (
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
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <div className="text-red-500 mb-2">{error}</div>
                  <button
                    onClick={() =>
                      fetchUsers(
                        pagination.currentPage,
                        pagination.itemsPerPage
                      )
                    }
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : (
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
                              user.role.includes("Admin")
                                ? "bg-indigo-100 text-indigo-800"
                                : user.role.includes("Super")
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role.includes("Admin") && (
                              <UserCircleIcon className="w-3.5 h-3.5 mr-1" />
                            )}
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                              user.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : user.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
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

                  {filteredUsers.length === 0 && !isLoading && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                            <UserGroupIcon className="w-8 h-8 text-slate-400" />
                          </div>
                          <p className="text-black font-medium">
                            No users found
                          </p>
                          <p className="text-slate-500 text-sm mt-1">
                            Try adjusting your search or filters
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {!isLoading && !error && (
            <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-slate-600 font-medium">
                Showing {filteredUsers.length} of {pagination.totalItems} users
              </div>
              <div className="flex items-center space-x-2">
                <button
                  disabled={pagination.currentPage <= 1}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  className={`flex items-center px-3 py-2 ${
                    pagination.currentPage <= 1
                      ? "bg-white border border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-white border border-slate-200 text-black rounded-lg cursor-pointer hover:bg-slate-50"
                  }`}
                >
                  <ChevronLeftIcon className="w-4 h-4 mr-1" />
                  Previous
                </button>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter(
                    (page) =>
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - pagination.currentPage) <= 1
                  )
                  .map((page, index, array) => {
                    // If there's a gap, show ellipsis
                    if (index > 0 && page - array[index - 1] > 1) {
                      return (
                        <span key={`ellipsis-${page}`} className="px-3 py-2">
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded-lg ${
                          pagination.currentPage === page
                            ? "bg-indigo-600 text-white"
                            : "bg-white border border-slate-200 text-black hover:bg-slate-50"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                <button
                  disabled={pagination.currentPage >= pagination.totalPages}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  className={`flex items-center px-3 py-2 ${
                    pagination.currentPage >= pagination.totalPages
                      ? "bg-white border border-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-white border border-slate-200 text-black rounded-lg cursor-pointer hover:bg-slate-50"
                  }`}
                >
                  Next
                  <ChevronRightIcon className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUserSubmit}
        mode="add"
      />

      {/* Edit User Modal */}
      <AddUserModal
        isOpen={isEditUserModalOpen}
        onClose={() => {
          setIsEditUserModalOpen(false);
          setSelectedUser(null);
        }}
        onAddUser={handleAddUserSubmit}
        onEditUser={handleEditUserSubmit}
        initialData={
          selectedUser
            ? {
                id: selectedUser.id,
                name: selectedUser.name,
                email: selectedUser.email,
                password: "", // Empty password in edit mode
                role: selectedUser.role,
                status: selectedUser.status,
              }
            : undefined
        }
        mode="edit"
      />
    </DashboardLayout>
  );
};

export default UserManagementPage;
