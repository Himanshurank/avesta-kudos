import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/core/application/context/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import UserDashboardTemplate from "@/components/templates/UserDashboardTemplate";
import AdminDashboardTemplate from "@/components/templates/AdminDashboardTemplate";
import SuperAdminDashboardTemplate from "@/components/templates/SuperAdminDashboardTemplate";

/**
 * Dashboard page component that renders the appropriate dashboard based on user role
 */
const Dashboard = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      toast.error("Please login to access the dashboard");
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // If still loading or no user, show loading screen
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  /**
   * Render the appropriate dashboard template based on user role
   */
  const renderRoleDashboard = () => {
    // Check if user has SUPER_ADMIN role
    if (user.roles && user.roles.some((role) => role.name === "SUPER_ADMIN")) {
      return <SuperAdminDashboardTemplate user={user} />;
    }
    // Check if user has ADMIN role
    else if (user.roles && user.roles.some((role) => role.name === "ADMIN")) {
      return <AdminDashboardTemplate user={user} />;
    }
    // Default to User dashboard
    else {
      return <UserDashboardTemplate user={user} />;
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      user={user}
    >
      {renderRoleDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
