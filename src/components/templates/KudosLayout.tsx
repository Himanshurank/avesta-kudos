import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/core/application/context/AuthContext";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  HomeIcon,
  UserIcon,
  HandThumbUpIcon,
  UserGroupIcon,
  StarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface KudosLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

const KudosLayout: React.FC<KudosLayoutProps> = ({
  activeTab,
  setActiveTab,
  children,
}) => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
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
      case "my-kudos":
        return <StarIcon className="w-5 h-5" />;
      case "team":
        return <UserGroupIcon className="w-5 h-5" />;
      default:
        return <HomeIcon className="w-5 h-5" />;
    }
  };

  // Define tabs for kudos section
  const tabs = [
    { id: "kudos", label: "Kudos Wall" },
    { id: "my-kudos", label: "My Kudos" },
    { id: "new", label: "Give Kudos" },
  ];

  const getUserRoleText = () => {
    if (!user) return "Guest";
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
    if (tabId === "dashboard") {
      router.push("/dashboard");
    } else if (tabId === "kudos") {
      router.push("/kudos");
    } else if (tabId === "my-kudos") {
      router.push("/kudos/my-kudos");
    } else if (tabId === "new") {
      router.push("/kudos/new");
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
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <div>
                  <h2 className="text-slate-800 font-bold text-lg leading-none">
                    Kudos Wall
                  </h2>
                  <p className="text-slate-500 text-xs mt-1">
                    {getUserRoleText()}
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

          {/* Dashboard link */}
          <div className="mt-6 px-2">
            <div className="pt-4 border-t border-slate-200">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => router.push("/dashboard")}
                className="flex items-center w-full px-3 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 transition-all duration-200 group"
              >
                <div className="bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 p-1.5 rounded-md transition-colors">
                  <HomeIcon className="w-5 h-5" />
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
                      Back to Dashboard
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        {user && (
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
        )}
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
              {tabs.find((t) => t.id === activeTab)?.label || "Kudos Wall"}
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            {user ? (
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
            ) : (
              <div className="flex space-x-3">
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/auth/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
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

export default KudosLayout; 