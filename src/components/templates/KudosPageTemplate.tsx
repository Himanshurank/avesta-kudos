import React from "react";
import KudosLayout from "@/components/templates/KudosLayout";
import KudosFilterPanel from "@/components/organisms/KudosFilterPanel";
import KudosGrid from "@/components/organisms/KudosGrid";
import GiveKudosButton from "@/components/atoms/GiveKudosButton/GiveKudosButton";
import { TeamValue, CategoryValue } from "@/shared/enums";
import router from "next/router";

interface IKudos {
  id: string;
  recipientName: string;
  teamName: string;
  category: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

interface IFormData {
  recipientName: string;
  teamName: TeamValue;
  category: CategoryValue;
  message: string;
}

interface IPagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface IProps {
  // Tabs state
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Filter state
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  teamFilter: string;
  setTeamFilter: (team: string) => void;
  teamOptions: string[];
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categoryOptions: string[];

  // Kudos data
  filteredKudos: IKudos[];

  // Modal state
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  formData: IFormData;
  onFormSubmit: (data: IFormData) => void;

  // Pagination
  pagination?: IPagination;
  onPageChange?: (page: number) => void;

  // Loading state
  isLoading?: boolean;

  className?: string;
  testId?: string;
}

const KudosPageTemplate = (props: IProps) => {
  const {
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    teamFilter,
    setTeamFilter,
    teamOptions,
    categoryFilter,
    setCategoryFilter,
    categoryOptions,
    filteredKudos,
    setIsModalOpen,
    pagination,
    onPageChange,
    isLoading = false,
    className = "",
    testId,
  } = props;

  const handleClearAllFilters = () => {
    setSearchTerm("");
    setTeamFilter(teamOptions[0]);
    setCategoryFilter(categoryOptions[0]);
  };

  const renderPagination = () => {
    if (!pagination || !onPageChange) return null;

    const { page, pages } = pagination;

    return (
      <div className="flex justify-center mt-6">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={`px-3 py-2 rounded-l-md border border-gray-300 ${
              page === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>

          <div className="flex">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`px-3 py-2 border border-gray-300 border-l-0 ${
                  page === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === pages}
            className={`px-3 py-2 rounded-r-md border border-gray-300 border-l-0 ${
              page === pages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    );
  };

  return (
    <KudosLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onOpenKudosModal={() => setIsModalOpen(true)}
    >
      <main
        className={`p-6 ${className}`}
        data-testid={testId || "kudos-page-template"}
      >
        <KudosFilterPanel
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          teamFilter={teamFilter}
          onTeamFilterChange={setTeamFilter}
          teamOptions={teamOptions}
          categoryFilter={categoryFilter}
          onCategoryFilterChange={setCategoryFilter}
          categoryOptions={categoryOptions}
          onClearAllFilters={handleClearAllFilters}
        />

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            <KudosGrid kudos={filteredKudos} />
            {renderPagination()}
          </>
        )}
      </main>

      <GiveKudosButton onClick={() => router.push("/kudos/new")} />
    </KudosLayout>
  );
};

export default KudosPageTemplate;
