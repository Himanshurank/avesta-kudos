import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

interface IHeaderProps {
  className?: string;
  testId?: string;
}

const Header = (props: IHeaderProps) => {
  const { className = "", testId } = props;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // Check if user is on auth pages
  const isAuthPage =
    router.pathname === "/auth/login" ||
    router.pathname === "/auth/register" ||
    router.pathname === "/auth/forgot-password" ||
    router.pathname === "/auth/registration-success";

  // In a real app, we would check for authentication here
  // For demo purposes, we'll consider user as logged in only if not on auth pages
  useEffect(() => {
    // This is a simplified check - in a real app, you would verify JWT tokens or session
    const checkAuth = () => {
      // For demo only - in a real app this would check token/session
      // Setting to false for now based on user request - only login will set this to true
      setIsLoggedIn(false);
    };

    checkAuth();
  }, [router.pathname]);

  const renderLogo = () => {
    return (
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <path d="M18 6.7l-8.48 8.48-3.54-3.54a2 2 0 1 0-2.83 2.83l4.24 4.24a1.98 1.98 0 0 0 2.83 0L20 10.7a2 2 0 1 0-2-4z" />
            </motion.svg>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700">
            Kudos Wall
          </h1>
        </Link>
      </div>
    );
  };

  const renderDesktopNavigation = () => {
    if (!isLoggedIn) return null;

    return (
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          href="/"
          className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          href="/analytics"
          className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group"
        >
          Analytics
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
        </Link>
        <Link
          href="/team"
          className="text-gray-700 hover:text-indigo-600 font-medium transition-colors relative group"
        >
          Teams
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
        </Link>
      </nav>
    );
  };

  const renderAuthButtons = () => {
    if (isLoggedIn) {
      return (
        <Link href="/kudos/new">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all px-5 py-2 rounded-lg font-medium shadow-md"
          >
            <span className="hidden md:inline">Give Kudos</span>
            <span className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </motion.button>
        </Link>
      );
    }

    if (!isAuthPage) {
      return (
        <>
          <Link href="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:flex items-center px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg font-medium"
            >
              Login
            </motion.button>
          </Link>
          <Link href="/auth/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:flex items-center px-4 py-2 text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition-colors rounded-lg font-medium"
            >
              Register
            </motion.button>
          </Link>
        </>
      );
    }

    return null;
  };

  const renderMobileMenuButton = () => {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </motion.button>
    );
  };

  const renderMobileMenu = () => {
    if (!isMobileMenuOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden mt-3 py-3 border-t border-gray-100"
      >
        <nav className="flex flex-col space-y-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/analytics"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Analytics
              </Link>
              <Link
                href="/team"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Teams
              </Link>
            </>
          ) : (
            <>
              {!isAuthPage && (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors px-2 py-1"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </motion.div>
    );
  };

  return (
    <header
      className={`backdrop-blur-md bg-white/80 border-b border-gray-100 sticky top-0 z-30 shadow-sm ${className}`}
      data-testid={testId || "header"}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {renderLogo()}
          {renderDesktopNavigation()}
          <div className="flex items-center space-x-3">
            {renderAuthButtons()}
            {renderMobileMenuButton()}
          </div>
        </div>
        {renderMobileMenu()}
      </div>
    </header>
  );
};

export default Header;
