import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/core/application/context/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import WelcomeCard from "@/components/molecules/WelcomeCard";
import StatCard from "@/components/molecules/StatCard";
import RecentActivityCard from "@/components/molecules/RecentActivityCard";

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

  // Render appropriate dashboard based on user role
  const renderRoleDashboard = () => {
    if (user.isSuperAdmin()) {
      return renderSuperAdminDashboard();
    } else if (user.isAdmin()) {
      return renderAdminDashboard();
    } else {
      return renderUserDashboard();
    }
  };

  // SuperAdmin dashboard - focuses on user management and system overview
  const renderSuperAdminDashboard = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        <WelcomeCard userName={user.name} userRole="Super Admin" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Users"
            value={85}
            icon="👥"
            trend="up"
            percentage={12}
          />
          <StatCard
            title="Pending Approvals"
            value={7}
            icon="⏳"
            trend="up"
            percentage={15}
          />
          <StatCard
            title="Total Kudos"
            value={324}
            icon="🌟"
            trend="up"
            percentage={8}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivityCard
            title="Recent User Activities"
            activities={[
              {
                id: 1,
                text: "New user registration: Sarah Smith",
                time: "30 min ago",
              },
              {
                id: 2,
                text: "User role updated: Mark Johnson to Admin",
                time: "2 hours ago",
              },
              {
                id: 3,
                text: "Account approval: Alex Williams",
                time: "Yesterday",
              },
            ]}
          />
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Administrator Actions
            </h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push("/dashboard/user-management")}
                className="w-full py-3 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                User Management
              </button>
              <button
                onClick={() => router.push("/dashboard/approval-queue")}
                className="w-full py-3 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors"
              >
                Approval Queue
              </button>
              <button
                onClick={() => router.push("/dashboard/system-settings")}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                System Settings
              </button>
              <button
                onClick={() => router.push("/dashboard/audit-logs")}
                className="w-full py-3 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Audit Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Admin dashboard - focuses on kudos management and analytics
  const renderAdminDashboard = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        <WelcomeCard userName={user.name} userRole="Admin" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Team Kudos"
            value={47}
            icon="🏆"
            trend="up"
            percentage={10}
          />
          <StatCard
            title="Monthly Activity"
            value={89}
            icon="📈"
            trend="up"
            percentage={23}
          />
          <StatCard
            title="Top Categories"
            value={5}
            icon="🏅"
            trend="same"
            percentage={0}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivityCard
            title="Recent Team Activities"
            activities={[
              { id: 1, text: "John gave kudos to Sarah", time: "2 hours ago" },
              {
                id: 2,
                text: "Team Engineering reached 100 kudos",
                time: "Yesterday",
              },
              {
                id: 3,
                text: "New category created: Innovation",
                time: "3 days ago",
              },
            ]}
          />
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push("/kudos/give")}
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Give Kudos
              </button>
              <button
                onClick={() => router.push("/dashboard/analytics")}
                className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                View Analytics
              </button>
              <button
                onClick={() => router.push("/dashboard/manage-teams")}
                className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Manage Teams
              </button>
              <button
                onClick={() => router.push("/dashboard/manage-categories")}
                className="w-full py-3 px-4 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Manage Categories
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Regular user dashboard - focuses on personal kudos and team activity
  const renderUserDashboard = () => {
    return (
      <div className="grid grid-cols-1 gap-6">
        <WelcomeCard userName={user.name} userRole="User" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Kudos Received"
            value={23}
            icon="👏"
            trend="up"
            percentage={12}
          />
          <StatCard
            title="Kudos Given"
            value={15}
            icon="👍"
            trend="up"
            percentage={5}
          />
          <StatCard
            title="Team Ranking"
            value={3}
            icon="🏆"
            trend="same"
            percentage={0}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivityCard
            title="Recent Activities"
            activities={[
              { id: 1, text: "John gave kudos to Sarah", time: "2 hours ago" },
              {
                id: 2,
                text: "You received kudos from Mark",
                time: "Yesterday",
              },
              {
                id: 3,
                text: "Team meeting highlights posted",
                time: "2 days ago",
              },
            ]}
          />
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => router.push("/kudos/give")}
                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Give Kudos
              </button>
              <button
                onClick={() => router.push("/kudos/my-kudos")}
                className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                My Kudos
              </button>
              <button
                onClick={() => router.push("/dashboard/profile")}
                className="w-full py-3 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
