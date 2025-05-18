import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/components/contexts/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { container } from "@/core/shared/di/container";
import DashboardLayout from "@/components/templates/DashboardLayout";

import UserHeader from "@/components/organisms/UserHeader";
import UserTable from "@/components/organisms/UserTable";
import PaginationControls from "@/components/organisms/PaginationControls";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import AddUserModal, {
  UserFormData,
} from "@/components/molecules/AddUserModal";

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  status: string;
  createdAt: string;
  team?: string;
}

interface Pagination {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

// Main component
const UserManagementPage: React.FC = () => {
  // Router and auth
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const [activeTab, setActiveTab] = useState("user-management");

  // UI states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  // Data states
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

  // Helper functions
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

  // Data fetching
  const fetchUsers = useCallback(
    async (page = 1, limit = 10) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await container.getAllUsersUseCase.execute({
          page,
          limit,
          roleId: selectedRole !== "All" ? getRoleId(selectedRole) : undefined,
          approvalStatus: selectedStatus !== "All" ? selectedStatus : undefined,
        });

        // Map the API response to the format expected by the UI
        const mappedUsers = result.users.map((apiUser) => ({
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
          team: apiUser.teamName || "",
        }));

        setUsers(mappedUsers);
        setPagination({
          totalItems: result.pagination.total,
          itemsPerPage: limit,
          currentPage: page,
          totalPages: result.pagination.pages,
        });

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again.");
        setIsLoading(false);
      }
    },
    [selectedRole, selectedStatus]
  );

  const getFilteredUsers = () => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  };

  // Event handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilter = (role: string) => {
    setSelectedRole(role);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleStatusFilter = (status: string) => {
    setSelectedStatus(status);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await container.deleteUserUseCase.execute(userId);
      toast.success("User deleted successfully");
      fetchUsers(pagination.currentPage, pagination.itemsPerPage);
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  const handleEditUser = (userId: number) => {
    const userToEdit = users.find((u) => u.id === userId);
    if (userToEdit) {
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
      const dataToUpdate: Partial<{
        name: string;
        email: string;
        roleIds: number;
        status: string;
        password?: string;
        teamId?: number;
      }> = {
        name: userData.name,
        email: userData.email,
        roleIds: getRoleId(userData.role as string) || 3,
        status: userData.status,
        teamId: Number(userData.team),
      };
      console.log(dataToUpdate);
      if (userData.password.trim()) {
        dataToUpdate.password = userData.password;
      }

      await container.updateUserUseCase.execute(userId, dataToUpdate);
      fetchUsers(pagination.currentPage, pagination.itemsPerPage);
      setIsEditUserModalOpen(false);
      setSelectedUser(null);
      toast.success("User updated successfully");
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update user");
    }
  };

  const handleAddUser = () => {
    setIsAddUserModalOpen(true);
  };

  const handleAddUserSubmit = async (userData: UserFormData) => {
    try {
      await container.createUserUseCase.execute({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        roleIds: getRoleId(userData.role as string) || 3,
        teamId: Number(userData.team),
      });

      fetchUsers(pagination.currentPage, pagination.itemsPerPage);
      setIsAddUserModalOpen(false);
      toast.success("User added successfully");
    } catch (err) {
      console.error("Error adding user:", err);
      toast.error("Failed to add user");
    }
  };

  const handleManageRoles = (userId: number) => {
    toast.success(`Role management modal would open for user ID: ${userId}`);
  };

  const handleExportUsers = () => {
    toast.success("Users data would be exported");
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Effects
  useEffect(() => {
    if (user) {
      fetchUsers(pagination.currentPage, pagination.itemsPerPage);
    }
  }, [
    user,
    selectedRole,
    selectedStatus,
    pagination.currentPage,
    pagination.itemsPerPage,
    fetchUsers,
  ]);

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
        <LoadingSpinner size="md" />
      </div>
    );
  }

  // Filtered users for rendering
  const filteredUsers = getFilteredUsers();

  // Render
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
          <UserHeader
            searchTerm={searchTerm}
            onSearch={handleSearch}
            selectedRole={selectedRole}
            selectedStatus={selectedStatus}
            onRoleFilter={handleRoleFilter}
            onStatusFilter={handleStatusFilter}
            showFilters={showFilters}
            toggleFilters={toggleFilters}
            onAddUser={handleAddUser}
            onExportUsers={handleExportUsers}
          />

          <div className="overflow-x-auto">
            <UserTable
              users={filteredUsers}
              isLoading={isLoading}
              error={error}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
              onManageRoles={handleManageRoles}
              onTryAgain={() =>
                fetchUsers(pagination.currentPage, pagination.itemsPerPage)
              }
            />
          </div>

          {!isLoading && !error && (
            <PaginationControls
              pagination={pagination}
              onPageChange={handlePageChange}
              totalFiltered={filteredUsers.length}
            />
          )}
        </motion.div>
      </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        onAddUser={handleAddUserSubmit}
        mode="add"
      />

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
                password: "",
                role: selectedUser.role,
                status: selectedUser.status,
                team: selectedUser.team || "",
              }
            : undefined
        }
        mode="edit"
      />
    </DashboardLayout>
  );
};

export default UserManagementPage;
