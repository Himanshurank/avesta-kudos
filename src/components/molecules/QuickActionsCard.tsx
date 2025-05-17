import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

interface ActionButton {
  label: string;
  path: string;
  colorClass: string;
  icon?: React.ReactNode;
  description?: string;
}

interface QuickActionsCardProps {
  title: string;
  actions: ActionButton[];
  className?: string;
}

const QuickActionsCard = ({
  title,
  actions,
  className = "",
}: QuickActionsCardProps) => {
  const router = useRouter();

  const handleActionClick = (path: string) => {
    router.push(path);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  // Predefined background styles
  const getButtonStyle = (colorClass: string, index: number) => {
    // If custom color class is provided, use it but ensure text is black
    if (colorClass && colorClass.includes("bg-")) {
      return colorClass;
    }

    // Default set of very light backgrounds
    const backgrounds = [
      "bg-blue-50 hover:bg-blue-100",
      "bg-indigo-50 hover:bg-indigo-100",
      "bg-purple-50 hover:bg-purple-100",
      "bg-green-50 hover:bg-green-100",
    ];

    // Get a consistent background based on the index
    return backgrounds[index % backgrounds.length];
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at top right, rgba(243, 244, 246, 0.2), transparent 400px)",
      }}
      data-testid="quick-actions-card"
    >
      <div className="px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center">
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <div className="ml-auto">
          <div className="w-8 h-1 bg-indigo-500 rounded-full"></div>
        </div>
      </div>

      <motion.div
        className="p-5"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="grid gap-3">
          {actions.map((action, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="overflow-hidden rounded-xl shadow-sm"
            >
              <button
                onClick={() => handleActionClick(action.path)}
                className={`w-full p-3.5 transition-all duration-200 group flex items-center ${getButtonStyle(
                  action.colorClass,
                  index
                )} text-black`}
              >
                {action.icon && (
                  <div className="mr-3 bg-white p-2 rounded-lg text-indigo-600 shadow-sm">
                    {action.icon}
                  </div>
                )}

                <div className="flex-1 text-left">
                  <div className="font-medium text-black">{action.label}</div>
                  {action.description && (
                    <div className="text-xs mt-0.5 text-black/70">
                      {action.description}
                    </div>
                  )}
                </div>

                <div className="text-black/60 group-hover:translate-x-1 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QuickActionsCard;
