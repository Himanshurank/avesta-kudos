import React from "react";
import { motion } from "framer-motion";
import { ClockIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Activity {
  id: number;
  text: string;
  time: string;
}

interface RecentActivityCardProps {
  title: string;
  activities: Activity[];
  className?: string;
  onViewAll?: () => void;
}

const RecentActivityCard = (props: RecentActivityCardProps) => {
  const { title, activities, className = "", onViewAll } = props;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  // Render helpers
  const renderActivityItem = (activity: Activity) => (
    <motion.div
      key={activity.id}
      variants={itemVariants}
      className="group relative flex items-start py-3.5 hover:bg-slate-50 rounded-lg px-3 -mx-3 transition-colors"
    >
      <div className="min-w-8 mr-4 pt-0.5">
        <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5"></div>
      </div>
      <div className="flex-1">
        <p className="text-black font-medium leading-tight">{activity.text}</p>
        <div className="flex items-center mt-1 text-xs text-slate-500">
          <ClockIcon className="w-3.5 h-3.5 mr-1" />
          <span>{activity.time}</span>
        </div>
      </div>
      <motion.div
        className="opacity-0 group-hover:opacity-100 transition-opacity self-center"
        whileHover={{ x: 3 }}
      >
        <ChevronRightIcon className="w-4 h-4 text-indigo-500" />
      </motion.div>
    </motion.div>
  );

  const renderEmptyState = () => (
    <div className="py-8 text-center">
      <div className="bg-slate-50 inline-flex items-center justify-center w-12 h-12 rounded-full mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-slate-500 font-medium">No recent activities</p>
      <p className="text-slate-400 text-sm mt-1">
        New activities will appear here when available
      </p>
    </div>
  );

  const renderViewAllButton = () => {
    if (activities.length === 0) return null;

    return (
      <div className="mt-2 border-t border-slate-100 pt-4 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onViewAll}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium inline-flex items-center"
        >
          View All Activities
          <ChevronRightIcon className="ml-1 w-4 h-4" />
        </motion.button>
      </div>
    );
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden ${className}`}
    >
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center">
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <div className="ml-auto">
          <div className="w-8 h-1 bg-indigo-500 rounded-full"></div>
        </div>
      </div>

      <div className="p-5">
        {activities.length === 0 ? (
          renderEmptyState()
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="divide-y divide-slate-100 -my-3.5"
          >
            {activities.map(renderActivityItem)}
          </motion.div>
        )}
        {renderViewAllButton()}
      </div>
    </div>
  );
};

export default RecentActivityCard;
