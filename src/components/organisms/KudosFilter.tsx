import React, { useState } from "react";
import { motion } from "framer-motion";

// Animation variants
const inputVariants = {
  focus: { scale: 1.02, boxShadow: "0 4px 20px -8px rgba(0, 0, 0, 0.1)" },
  blur: { scale: 1, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" },
};

const KudosFilter = () => {
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({
    teamFilter: false,
    categoryFilter: false,
    dateFilter: false,
  });

  const toggleFilter = (filterName: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <motion.div whileFocus={{ scale: 1.02 }} className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-indigo-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <motion.input
            variants={inputVariants}
            whileFocus="focus"
            initial="blur"
            type="text"
            className="w-full py-3 pl-12 pr-4 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30 transition-all duration-200 outline-none bg-white shadow-sm"
            placeholder="Search by name, team or keyword..."
          />
        </motion.div>
      </div>

      {/* Collapsible Filter Sections */}
      <div className="space-y-3">
        {/* Team Filter */}
        <div className="rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm">
          <button
            onClick={() => toggleFilter("teamFilter")}
            className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
          >
            <div className="flex items-center">
              <span className="text-indigo-600 mr-2">👥</span>
              <span className="font-medium">Team</span>
            </div>
            <motion.div
              animate={{ rotate: activeFilters.teamFilter ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </motion.div>
          </button>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: activeFilters.teamFilter ? "auto" : 0,
              opacity: activeFilters.teamFilter ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="team-all"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="team-all"
                  className="ml-2 text-sm text-gray-700"
                >
                  All Teams
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="team-engineering"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="team-engineering"
                  className="ml-2 text-sm text-gray-700"
                >
                  Engineering
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="team-design"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="team-design"
                  className="ml-2 text-sm text-gray-700"
                >
                  Design
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="team-product"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="team-product"
                  className="ml-2 text-sm text-gray-700"
                >
                  Product
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="team-marketing"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="team-marketing"
                  className="ml-2 text-sm text-gray-700"
                >
                  Marketing
                </label>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm">
          <button
            onClick={() => toggleFilter("categoryFilter")}
            className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
          >
            <div className="flex items-center">
              <span className="text-indigo-600 mr-2">🏷️</span>
              <span className="font-medium">Category</span>
            </div>
            <motion.div
              animate={{ rotate: activeFilters.categoryFilter ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </motion.div>
          </button>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: activeFilters.categoryFilter ? "auto" : 0,
              opacity: activeFilters.categoryFilter ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cat-all"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label htmlFor="cat-all" className="ml-2 text-sm text-gray-700">
                  All Categories
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cat-teamwork"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="cat-teamwork"
                  className="ml-2 text-sm text-gray-700"
                >
                  <span className="inline-block mr-1">👥</span> Teamwork
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cat-innovation"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="cat-innovation"
                  className="ml-2 text-sm text-gray-700"
                >
                  <span className="inline-block mr-1">💡</span> Innovation
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cat-helping-hand"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="cat-helping-hand"
                  className="ml-2 text-sm text-gray-700"
                >
                  <span className="inline-block mr-1">🤝</span> Helping Hand
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cat-leadership"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="cat-leadership"
                  className="ml-2 text-sm text-gray-700"
                >
                  <span className="inline-block mr-1">🏆</span> Leadership
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="cat-excellence"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label
                  htmlFor="cat-excellence"
                  className="ml-2 text-sm text-gray-700"
                >
                  <span className="inline-block mr-1">⭐</span> Excellence
                </label>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Date Range Filter */}
        <div className="rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm">
          <button
            onClick={() => toggleFilter("dateFilter")}
            className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
          >
            <div className="flex items-center">
              <span className="text-indigo-600 mr-2">📅</span>
              <span className="font-medium">Date Range</span>
            </div>
            <motion.div
              animate={{ rotate: activeFilters.dateFilter ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </motion.div>
          </button>

          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: activeFilters.dateFilter ? "auto" : 0,
              opacity: activeFilters.dateFilter ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-3">
              <div className="space-y-1">
                <label className="text-sm text-gray-600">From</label>
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  initial="blur"
                  type="date"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30 text-sm"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm text-gray-600">To</label>
                <motion.input
                  variants={inputVariants}
                  whileFocus="focus"
                  initial="blur"
                  type="date"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30 text-sm"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200"
        >
          Apply Filters
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 bg-gray-50 text-gray-600 border border-gray-200 py-3 px-4 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200"
        >
          Reset
        </motion.button>
      </div>
    </div>
  );
};

export default KudosFilter;
