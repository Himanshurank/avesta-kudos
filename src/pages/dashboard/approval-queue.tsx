import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/components/contexts/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import ApprovalQueueTemplate from "@/components/templates/ApprovalQueueTemplate";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { container } from "@/core/shared/di/container";
import { User } from "@/core/domain/entities/User";

// Interface for pending user data
interface PendingUser {
  id: number;
  name: string;
  email: string;
  requestedRole: string;
  department: string;
  registeredAt: string;
}

const ApprovalQueuePage = () => {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const [activeTab, setActiveTab] = useState("approval-queue");
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch pending users
  const fetchPendingUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await container.getAllUsersUseCase.execute({
        approvalStatus: "Pending",
      });

      // Map API response to the format expected by the UI
      const mappedUsers = result.users.map((apiUser: User) => ({
        id: apiUser.id,
        name: apiUser.name,
        email: apiUser.email,
        requestedRole: Array.isArray(apiUser.roles)
          ? apiUser.roles[0]?.name || "User"
          : "User",
        department: apiUser.team?.name || "Unassigned",
        registeredAt: apiUser.createdAt
          ? new Date(apiUser.createdAt).toLocaleString()
          : "Unknown",
      }));

      setPendingUsers(mappedUsers);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching pending users:", err);
      setError("Failed to load pending users. Please try again.");
      setIsLoading(false);
    }
  };

  // Check authentication and authorization
  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      toast.error("Please login to access the dashboard");
      router.push("/auth/login");
      return;
    }

    // If user is not a super admin, redirect to dashboard
    if (
      !loading &&
      user &&
      !(user.roles && user.roles.some((role) => role.name === "SUPER_ADMIN"))
    ) {
      toast.error("You don't have permission to access this page");
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Fetch pending users when component mounts
  useEffect(() => {
    if (
      user &&
      user.roles &&
      user.roles.some((role) => role.name === "SUPER_ADMIN")
    ) {
      fetchPendingUsers();
    }
  }, [user]);

  // Event handlers
  const handleApprove = async (userId: number) => {
    try {
      // Ensure roleIds is always provided when approving (3 is the default User role)
      const roleId = 3; // Default to regular User role

      await container.approveRejectUserUseCase.execute(userId, {
        approvalStatus: "Approved",
        roleIds: roleId,
      });

      toast.success(`User approved: ID ${userId}`);
      // Refresh the list after approval
      fetchPendingUsers();
    } catch (err) {
      console.error("Error approving user:", err);
      toast.error(
        err instanceof Error ? err.message : "Failed to approve user"
      );
    }
  };

  const handleReject = async (userId: number) => {
    try {
      await container.approveRejectUserUseCase.execute(userId, {
        approvalStatus: "Rejected",
      });

      toast.success(`User rejected: ID ${userId}`);
      // Refresh the list after rejection
      fetchPendingUsers();
    } catch (err) {
      console.error("Error rejecting user:", err);
      toast.error(err instanceof Error ? err.message : "Failed to reject user");
    }
  };

  // If still loading or no user, show loading screen
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      user={user}
    >
      <ApprovalQueueTemplate
        pendingUsers={pendingUsers}
        onApprove={handleApprove}
        onReject={handleReject}
        isLoading={isLoading}
        error={error}
        onRetry={fetchPendingUsers}
      />
    </DashboardLayout>
  );
};

export default ApprovalQueuePage;
