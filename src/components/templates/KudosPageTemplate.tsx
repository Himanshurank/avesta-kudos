import React from "react";
import KudosLayout from "@/components/templates/KudosLayout";
import KudosFilterPanel from "@/components/organisms/KudosFilterPanel";
import KudosGrid from "@/components/organisms/KudosGrid";
import KudosModal from "@/components/organisms/KudosModal";
import GiveKudosButton from "@/components/atoms/GiveKudosButton/GiveKudosButton";
import { TeamValue, CategoryValue } from "@/shared/enums";
import { Pagination } from "@/core/domain/interfaces/IKudosRepository";
import Spinner from "@/components/atoms/Spinner/Spinner";
import ErrorMessage from "@/components/molecules/ErrorMessage/ErrorMessage";
import Paginator from "@/components/molecules/Paginator/Paginator";

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
  filteredKudos: any[]; // Changed to accept both old and new format

  // Modal state
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  formData: IFormData;
  onFormSubmit: (data: IFormData) => void;

  // Added props for API integration
  isLoading?: boolean;
  error?: string;
  pagination?: Pagination | null;
  onPageChange?: (page: number) => void;

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
    isModalOpen,
    setIsModalOpen,
    formData,
    onFormSubmit,
    isLoading = false,
    error = null,
    pagination = null,
    onPageChange = () => {},
    className = "",
    testId,
  } = props;

  const handleClearAllFilters = () => {
    setSearchTerm("");
    setTeamFilter(teamOptions[0]);
    setCategoryFilter(categoryOptions[0]);
  };

  // Map new Kudos format to the format expected by KudosGrid
  const mappedKudos = filteredKudos.map((kudos: any) => {
    // Check if it's already in the old format
    if (kudos.recipientName) {
      return kudos;
    }

    // Map from new domain entity format to the format KudosGrid expects
    return {
      id: kudos.id.toString(),
      recipientName: kudos.recipients.map((r: any) => r.name).join(", "),
      teamName: kudos.team.name,
      category: kudos.category.name,
      message: kudos.message,
      createdBy: kudos.createdBy.name,
      createdAt: formatDate(kudos.createdAt),
    };
  });

  // Helper function to format date
  function formatDate(date: Date | string): string {
    if (!date) return "";

    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return "1 week ago";
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

    return d.toLocaleDateString();
  }

  return (
    <KudosLayout activeTab={activeTab} setActiveTab={setActiveTab}>
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
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : error ? (
          <div className="my-8">
            <ErrorMessage message={error} />
          </div>
        ) : (
          <>
            <KudosGrid kudos={mappedKudos} />

            {pagination && (
              <div className="mt-8">
                <Paginator
                  currentPage={pagination.page}
                  totalPages={pagination.pages}
                  onPageChange={onPageChange}
                />
              </div>
            )}
          </>
        )}
      </main>

      <GiveKudosButton onClick={() => setIsModalOpen(true)} />

      <KudosModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={formData}
        onSubmit={onFormSubmit}
      />
    </KudosLayout>
  );
};

export default KudosPageTemplate;
