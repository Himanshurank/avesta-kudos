import React from "react";
import { useRouter } from "next/router";
import { User } from "@/core/domain/entities/User";
import { useAuth } from "@/core/application/context/AuthContext";

interface DashboardLayoutProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  user,
  activeTab,
  setActiveTab,
  children,
}) => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push("/auth/login");
    }
  };

  // Base tabs for all users
  const getTabs = () => {
    // Common tabs for all users
    const commonTabs = [
      { id: "dashboard", label: "Dashboard", icon: "📊" },
      { id: "kudos", label: "Kudos Wall", icon: "👏" },
      { id: "profile", label: "Profile", icon: "👤" },
    ];

    // SuperAdmin specific tabs
    if (user.isSuperAdmin()) {
      return [
        ...commonTabs,
        { id: "user-management", label: "User Management", icon: "👥" },
        { id: "approval-queue", label: "Approval Queue", icon: "⏳" },
        { id: "system-settings", label: "System Settings", icon: "⚙️" },
        { id: "audit-logs", label: "Audit Logs", icon: "📝" },
      ];
    }

    // Admin specific tabs
    if (user.isAdmin()) {
      return [
        ...commonTabs,
        { id: "analytics", label: "Analytics", icon: "📈" },
        { id: "manage-teams", label: "Teams", icon: "👥" },
        { id: "manage-categories", label: "Categories", icon: "🏷️" },
      ];
    }

    // Regular user tabs
    return [
      ...commonTabs,
      { id: "my-kudos", label: "My Kudos", icon: "🌟" },
      { id: "team", label: "My Team", icon: "👥" },
    ];
  };

  const tabs = getTabs();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-indigo-600">Digital Kudos</h2>
          <p className="text-xs text-gray-500 mt-1">
            {user.isSuperAdmin()
              ? "Super Admin"
              : user.isAdmin()
              ? "Admin"
              : "User"}{" "}
            Portal
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6">
          <ul>
            {tabs.map((tab) => (
              <li key={tab.id} className="px-4">
                <button
                  onClick={() => {
                    setActiveTab(tab.id);
                    // Handle navigation for different tabs
                    if (tab.id === "dashboard") {
                      router.push("/dashboard");
                    } else if (tab.id === "kudos") {
                      router.push("/kudos");
                    } else if (tab.id === "profile") {
                      router.push("/dashboard/profile");
                    } else if (tab.id === "my-kudos") {
                      router.push("/kudos/my-kudos");
                    } else if (tab.id === "team") {
                      router.push("/dashboard/team");
                    } else if (tab.id === "user-management") {
                      router.push("/dashboard/user-management");
                    } else if (tab.id === "approval-queue") {
                      router.push("/dashboard/approval-queue");
                    } else if (tab.id === "system-settings") {
                      router.push("/dashboard/system-settings");
                    } else if (tab.id === "audit-logs") {
                      router.push("/dashboard/audit-logs");
                    } else if (tab.id === "analytics") {
                      router.push("/dashboard/analytics");
                    } else if (tab.id === "manage-teams") {
                      router.push("/dashboard/manage-teams");
                    } else if (tab.id === "manage-categories") {
                      router.push("/dashboard/manage-categories");
                    }
                  }}
                  className={`flex items-center w-full px-4 py-3 my-1 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <span className="mr-3">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {tabs.find((t) => t.id === activeTab)?.label || "Dashboard"}
          </h1>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100">
                🔔
              </button>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                3
              </span>
            </div>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="ml-2 font-medium text-gray-700">
                {user.name}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
