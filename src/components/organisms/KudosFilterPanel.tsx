import React from "react";
import { motion } from "framer-motion";
import SearchBar from "@/components/molecules/SearchBar/SearchBar";
import FilterDropdown from "@/components/molecules/FilterDropdown/FilterDropdown";
import ActiveFilters from "@/components/molecules/ActiveFilters/ActiveFilters";

// Import the IFilter interface from ActiveFilters
interface IFilter {
  type: "search" | "team" | "category";
  value: string;
}

interface IProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  teamFilter: string;
  onTeamFilterChange: (value: string) => void;
  teamOptions: string[];
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  categoryOptions: string[];
  onClearAllFilters: () => void;
  className?: string;
  testId?: string;
}

const KudosFilterPanel = (props: IProps) => {
  const {
    searchTerm,
    onSearchChange,
    teamFilter,
    onTeamFilterChange,
    teamOptions,
    categoryFilter,
    onCategoryFilterChange,
    categoryOptions,
    onClearAllFilters,
    className = "",
    testId,
  } = props;

  const hasActiveFilters =
    searchTerm ||
    teamFilter !== teamOptions[0] ||
    categoryFilter !== categoryOptions[0];

  const getActiveFilters = (): IFilter[] => {
    const filters: IFilter[] = [];

    if (searchTerm) {
      filters.push({ type: "search", value: searchTerm });
    }

    if (teamFilter !== teamOptions[0]) {
      filters.push({ type: "team", value: teamFilter });
    }

    if (categoryFilter !== categoryOptions[0]) {
      filters.push({ type: "category", value: categoryFilter });
    }

    return filters;
  };

  const handleRemoveFilter = (type: string) => {
    switch (type) {
      case "search":
        onSearchChange("");
        break;
      case "team":
        onTeamFilterChange(teamOptions[0]);
        break;
      case "category":
        onCategoryFilterChange(categoryOptions[0]);
        break;
      default:
        break;
    }
  };

  const teamIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-indigo-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  );

  const categoryIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-indigo-500"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100 bg-gradient-to-br from-white to-gray-50 ${className}`}
      data-testid={testId || "kudos-filter-panel"}
    >
      <div className="flex items-center mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-indigo-600 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="text-lg font-semibold text-gray-800">Filter Kudos</h3>
      </div>

      <SearchBar value={searchTerm} onChange={onSearchChange} />

      <div className="flex flex-col sm:flex-row gap-5 mb-5">
        <FilterDropdown
          label="Team"
          icon={teamIcon}
          value={teamFilter}
          options={teamOptions}
          onChange={onTeamFilterChange}
        />

        <FilterDropdown
          label="Category"
          icon={categoryIcon}
          value={categoryFilter}
          options={categoryOptions}
          onChange={onCategoryFilterChange}
        />
      </div>

      {hasActiveFilters && (
        <ActiveFilters
          filters={getActiveFilters()}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={onClearAllFilters}
        />
      )}
    </motion.div>
  );
};

export default KudosFilterPanel;
