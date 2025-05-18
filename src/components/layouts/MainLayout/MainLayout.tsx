import React from 'react';
import { motion } from 'framer-motion';
import Typography from '@/components/atoms/Typography';
import { useAuthContext } from '@/components/contexts/AuthContext';

interface MainLayoutProps {
  /**
   * Layout content
   */
  children: React.ReactNode;
  /**
   * Page title
   */
  title?: string;
  /**
   * Whether to show the header
   */
  showHeader?: boolean;
  /**
   * Whether to show the footer
   */
  showFooter?: boolean;
  /**
   * Test ID for testing
   */
  testId?: string;
}

const MainLayout = (props: MainLayoutProps) => {
  const {
    children,
    title,
    showHeader = true,
    showFooter = true,
    testId = 'main-layout',
  } = props;
  
  const { isAuthenticated } = useAuthContext();

  return (
    <div className="min-h-screen flex flex-col" data-testid={testId}>
      {showHeader && (
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center cursor-pointer"
                >
                  <span className="text-2xl mr-2">🎯</span>
                  <Typography variant="h5" bold color="primary">
                    Kudos
                  </Typography>
                </motion.div>
              </div>
              <nav className="flex space-x-6">
                <NavLink href="/" label="Home" />
                {!isAuthenticated && <NavLink href="/kudos/new" label="Give Kudos" />}
              </nav>
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white cursor-pointer"
                >
                  <span>JS</span>
                </motion.div>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="flex-grow">
        {title && (
          <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <Typography variant="h2" bold>
                {title}
              </Typography>
            </div>
          </div>
        )}
        <div className="py-6">{children}</div>
      </main>

      {showFooter && (
        <footer className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <Typography variant="body2" color="secondary">
                &copy; {new Date().getFullYear()} Kudos App. All rights reserved.
              </Typography>
              <div className="flex space-x-6">
                <Typography
                  variant="body2"
                  color="secondary"
                  className="hover:text-indigo-600 cursor-pointer"
                >
                  Privacy Policy
                </Typography>
                <Typography
                  variant="body2"
                  color="secondary"
                  className="hover:text-indigo-600 cursor-pointer"
                >
                  Terms of Service
                </Typography>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

const NavLink = ({ href, label }: { href: string; label: string }) => {
  return (
    <a
      href={href}
      className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
    >
      {label}
    </a>
  );
};

export default MainLayout; 