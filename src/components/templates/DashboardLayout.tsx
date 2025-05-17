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

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "kudos", label: "Kudos", icon: "👏" },
    { id: "team", label: "Team", icon: "👥" },
    { id: "profile", label: "Profile", icon: "👤" },
  ];

  // Add admin tab if user is admin
  if (user.isAdmin()) {
    tabs.push({ id: "admin", label: "Admin", icon: "⚙️" });
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-indigo-600">Digital Kudos</h2>
        </div>

        {/* Navigation Items */}
        <nav className="mt-6">
          <ul>
            {tabs.map((tab) => (
              <li key={tab.id} className="px-4">
                <button
                  onClick={() => setActiveTab(tab.id)}
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
