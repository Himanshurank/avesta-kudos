import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/components/contexts/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import ApprovalQueueTemplate from "@/components/templates/ApprovalQueueTemplate";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

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

  // Mock data for pending users
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([
    {
      id: 5,
      name: "Alex Johnson",
      email: "alex@example.com",
      requestedRole: "User",
      department: "Marketing",
      registeredAt: "2023-06-12 09:45 AM",
    },
    {
      id: 6,
      name: "Jessica Williams",
      email: "jessica@example.com",
      requestedRole: "Admin",
      department: "Engineering",
      registeredAt: "2023-06-13 02:30 PM",
    },
    {
      id: 7,
      name: "Robert Brown",
      email: "robert@example.com",
      requestedRole: "User",
      department: "Sales",
      registeredAt: "2023-06-14 11:15 AM",
    },
  ]);

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

  // Event handlers
  const handleApprove = (userId: number) => {
    toast.success(`User approved: ID ${userId}`);
    // In a real app, this would call an API to update the user status
    setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
  };

  const handleReject = (userId: number) => {
    toast.success(`User rejected: ID ${userId}`);
    // In a real app, this would call an API to update the user status
    setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
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
      />
    </DashboardLayout>
  );
};

export default ApprovalQueuePage;
