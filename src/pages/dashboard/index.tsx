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

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      user={user}
    >
      <div className="grid grid-cols-1 gap-6">
        <WelcomeCard
          userName={user.name}
          userRole={user.isAdmin() ? "Admin" : "User"}
        />

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

              {user.isAdmin() && (
                <button
                  onClick={() => router.push("/dashboard/manage-users")}
                  className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Manage Users
                </button>
              )}

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
    </DashboardLayout>
  );
};

export default Dashboard;
