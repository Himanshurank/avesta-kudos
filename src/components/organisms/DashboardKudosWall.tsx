import React, { useState } from "react";

interface KudosFilters {
  team: string;
  category: string;
  searchTerm: string;
}

interface KudosCardData {
  id: number;
  team: string;
  recipient: string;
  message: string;
  category: string;
  categoryIcon: string;
  sender: string;
  createdAt: string;
}

interface DashboardKudosWallProps {
  kudosData: KudosCardData[];
  className?: string;
}

const DashboardKudosWall = ({
  kudosData = [],
  className = "",
}: DashboardKudosWallProps) => {
  const [filters, setFilters] = useState<KudosFilters>({
    team: "",
    category: "",
    searchTerm: "",
  });

  // Handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      team: "",
      category: "",
      searchTerm: "",
    });
  };

  // Apply filters function would be implemented here in a real application
  // This would filter the kudosData based on the selected filters

  const renderFilterSection = () => (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-medium mb-3 text-gray-700">Filter Kudos</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Team
          </label>
          <select
            name="team"
            value={filters.team}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
          >
            <option value="">All Teams</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="product">Product</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Category
          </label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
          >
            <option value="">All Categories</option>
            <option value="teamwork">Teamwork</option>
            <option value="innovation">Innovation</option>
            <option value="helping_hand">Helping Hand</option>
            <option value="leadership">Leadership</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1">
            Search
          </label>
          <input
            type="text"
            name="searchTerm"
            value={filters.searchTerm}
            onChange={handleFilterChange}
            placeholder="Search kudos..."
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
          />
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button
          onClick={handleResetFilters}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
        >
          Reset
        </button>
        <button className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
          Apply Filters
        </button>
      </div>
    </div>
  );

  const renderKudosCards = () => (
    <div className="space-y-4">
      {/* Use the kudosData prop instead of hardcoded array */}
      {kudosData.length > 0 ? (
        kudosData.map((kudos) => (
          <div
            key={kudos.id}
            className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-indigo-600">
                {kudos.team}
              </span>
              <span className="text-xs text-gray-500">{kudos.createdAt}</span>
            </div>
            <h3 className="font-medium">To: {kudos.recipient}</h3>
            <p className="text-gray-600 mt-2 text-sm">{kudos.message}</p>
            <div className="mt-3 flex justify-between items-center">
              <span className="inline-flex items-center bg-indigo-50 px-2 py-1 rounded-full text-xs text-indigo-700">
                <span className="mr-1">{kudos.categoryIcon}</span>{" "}
                {kudos.category}
              </span>
              <span className="text-xs text-gray-500">
                From: {kudos.sender}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">
          No kudos found. Be the first to recognize someone!
        </div>
      )}
    </div>
  );

  const renderPagination = () => (
    <div className="mt-6 flex justify-center">
      <nav className="flex items-center space-x-1">
        <button className="px-2 py-1 text-sm rounded hover:bg-gray-100">
          Previous
        </button>
        <button className="px-3 py-1 text-sm rounded bg-indigo-600 text-white">
          1
        </button>
        <button className="px-3 py-1 text-sm rounded hover:bg-gray-100">
          2
        </button>
        <button className="px-3 py-1 text-sm rounded hover:bg-gray-100">
          3
        </button>
        <button className="px-2 py-1 text-sm rounded hover:bg-gray-100">
          Next
        </button>
      </nav>
    </div>
  );

  return (
    <div
      className={`bg-white rounded-lg shadow p-6 ${className}`}
      data-testid="dashboard-kudos-wall"
    >
      <h2 className="text-xl font-semibold mb-4">Kudos Wall</h2>
      {renderFilterSection()}
      {renderKudosCards()}
      {renderPagination()}
    </div>
  );
};

export default DashboardKudosWall;
