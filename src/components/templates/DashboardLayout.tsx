import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { User } from "@/core/domain/entities/User";
import { useAuthContext } from "@/components/contexts/AuthContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  HomeIcon,
  UserIcon,
  HandThumbUpIcon,
  UserGroupIcon,
  ClockIcon,
  ChartBarIcon,
  TagIcon,
  StarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

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
  const { logout } = useAuthContext();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push("/auth/login");
    }
  };

  // Map tab IDs to their respective icons
  const getIconForTab = (id: string) => {
    switch (id) {
      case "dashboard":
        return <HomeIcon className="w-5 h-5" />;
      case "kudos":
        return <HandThumbUpIcon className="w-5 h-5" />;
      case "profile":
        return <UserIcon className="w-5 h-5" />;
      case "user-management":
        return <UserGroupIcon className="w-5 h-5" />;
      case "approval-queue":
        return <ClockIcon className="w-5 h-5" />;
      case "analytics":
        return <ChartBarIcon className="w-5 h-5" />;
      case "manage-teams":
        return <UserGroupIcon className="w-5 h-5" />;
      case "manage-categories":
        return <TagIcon className="w-5 h-5" />;
      case "my-kudos":
        return <StarIcon className="w-5 h-5" />;
      case "team":
        return <UserGroupIcon className="w-5 h-5" />;
      default:
        return <HomeIcon className="w-5 h-5" />;
    }
  };

  // Base tabs for all users
  const getTabs = () => {
    // Common tabs for all users
    const commonTabs = [
      { id: "dashboard", label: "Dashboard" },
      { id: "profile", label: "Profile" },
    ];

    // SuperAdmin specific tabs - check for role directly
    if (user.roles && user.roles.some((role) => role.name === "SUPER_ADMIN")) {
      return [
        ...commonTabs,
        { id: "kudos", label: "Kudos Wall" },
        { id: "analytics", label: "Analytics" },
        { id: "user-management", label: "User Management" },
        { id: "approval-queue", label: "Approval Queue" },
      ];
    }

    // Admin specific tabs - check for role directly
    if (user.roles && user.roles.some((role) => role.name === "ADMIN")) {
      return [
        ...commonTabs,
        { id: "kudos", label: "Kudos Wall" },
        { id: "analytics", label: "Analytics" },
        { id: "manage-teams", label: "Teams" },
        { id: "manage-categories", label: "Categories" },
      ];
    }

    // Regular user tabs
    return [
      ...commonTabs,
      { id: "my-kudos", label: "My Kudos" },
      { id: "team", label: "My Team" },
    ];
  };

  const tabs = getTabs();

  const getUserRoleText = () => {
    if (user.roles && user.roles.some((role) => role.name === "SUPER_ADMIN")) {
      return "Super Admin";
    } else if (user.roles && user.roles.some((role) => role.name === "ADMIN")) {
      return "Admin";
    } else {
      return "User";
    }
  };

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    // Handle navigation for different tabs
    if (tabId === "dashboard") {
      router.push("/dashboard");
    } else if (tabId === "kudos") {
      router.push("/kudos");
    } else if (tabId === "profile") {
      router.push("/dashboard/profile");
    } else if (tabId === "my-kudos") {
      router.push("/kudos/my-kudos");
    } else if (tabId === "team") {
      router.push("/dashboard/team");
    } else if (tabId === "user-management") {
      router.push("/dashboard/user-management");
    } else if (tabId === "approval-queue") {
      router.push("/dashboard/approval-queue");
    } else if (tabId === "analytics") {
      router.push("/dashboard/analytics");
    } else if (tabId === "manage-teams") {
      router.push("/dashboard/manage-teams");
    } else if (tabId === "manage-categories") {
      router.push("/dashboard/manage-categories");
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  // Animation variants for framer motion
  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "72px" },
  };

  const mainContentVariants = {
    expanded: { marginLeft: "240px" },
    collapsed: { marginLeft: "72px" },
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={isSidebarCollapsed ? "collapsed" : "expanded"}
        variants={prefersReducedMotion ? {} : sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed h-screen bg-white shadow-lg z-10 overflow-hidden border-r border-slate-200"
      >
        {/* Logo and toggle */}
        <div className="px-4 py-5 border-b border-slate-200 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">D</span>
                </div>
                <div>
                  <h2 className="text-slate-800 font-bold text-lg leading-none">
                    Digital Kudos
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    {getUserRoleText()} Portal
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSidebar}
            className="p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            {isSidebarCollapsed ? (
              <ArrowRightIcon className="w-4 h-4" />
            ) : (
              <ArrowLeftIcon className="w-4 h-4" />
            )}
          </motion.button>
        </div>

        {/* Navigation Items */}
        <div className="mt-4 flex-1 overflow-y-auto">
          <nav>
            <ul className="px-2 space-y-1">
              {tabs.map((tab) => (
                <motion.li
                  key={tab.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.1 }}
                >
                  <button
                    onClick={() => handleNavigate(tab.id)}
                    className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 group
                      ${
                        activeTab === tab.id
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    <div
                      className={`${
                        activeTab === tab.id
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                      } p-1.5 rounded-md transition-colors`}
                    >
                      {getIconForTab(tab.id)}
                    </div>

                    <AnimatePresence mode="wait">
                      {!isSidebarCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="ml-3 font-medium"
                        >
                          {tab.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-200">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <div className="bg-slate-100 p-1.5 rounded-md text-slate-600">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </div>
            <AnimatePresence mode="wait">
              {!isSidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 font-medium"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={false}
        animate={isSidebarCollapsed ? "collapsed" : "expanded"}
        variants={prefersReducedMotion ? {} : mainContentVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 flex flex-col min-h-screen overflow-hidden"
      >
        {/* Header */}
        <motion.header
          initial={false}
          animate={{
            boxShadow: scrolled
              ? "0 2px 15px rgba(0, 0, 0, 0.08)"
              : "0 2px 5px rgba(0, 0, 0, 0.03)",
            backgroundColor: scrolled ? "#ffffff" : "#fdfdfd",
          }}
          transition={{ duration: 0.3 }}
          className="px-6 py-4 flex justify-between items-center sticky top-0 z-10"
        >
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-800">
              {activeTab === "analytics" 
                ? "Analytics Dashboard" 
                : tabs.find((t) => t.id === activeTab)?.label || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center space-x-5">
            {/* Search */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 pr-10 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Notification bell */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors relative"
              >
                <BellIcon className="w-6 h-6 text-slate-600" />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  3
                </span>
              </motion.button>

              {/* Notification dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg overflow-hidden z-50 border border-slate-100"
                  >
                    <div className="p-4 border-b border-slate-100">
                      <h3 className="font-semibold text-slate-800">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      <div className="p-3.5 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                        <div className="flex">
                          <div className="mr-3 mt-0.5">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <HandThumbUpIcon className="w-4 h-4 text-blue-600" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              New kudos received
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Sarah recognized your hard work on the project
                            </p>
                            <p className="text-xs text-slate-400 mt-1.5">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 border-b border-slate-100 hover:bg-slate-50 cursor-pointer">
                        <div className="flex">
                          <div className="mr-3 mt-0.5">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                              <UserGroupIcon className="w-4 h-4 text-green-600" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              Team achievement unlocked
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Your team received 100+ kudos this month!
                            </p>
                            <p className="text-xs text-slate-400 mt-1.5">
                              Yesterday
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 hover:bg-slate-50 cursor-pointer">
                        <div className="flex">
                          <div className="mr-3 mt-0.5">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                              <TagIcon className="w-4 h-4 text-purple-600" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">
                              New category added
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Innovation category is now available for kudos
                            </p>
                            <p className="text-xs text-slate-400 mt-1.5">
                              3 days ago
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User profile */}
            <div className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md"
              >
                {user.name.charAt(0).toUpperCase()}
              </motion.div>
              <div className="ml-3">
                <p className="font-medium text-slate-800 text-sm leading-tight">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 leading-tight">
                  {getUserRoleText()}
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6 overflow-y-auto"
        >
          {children}
        </motion.main>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
