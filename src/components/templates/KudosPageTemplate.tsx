import React from "react";
import KudosLayout from "@/components/templates/KudosLayout";
import KudosFilterPanel from "@/components/organisms/KudosFilterPanel";
import KudosGrid from "@/components/organisms/KudosGrid";
import KudosModal from "@/components/organisms/KudosModal";
import GiveKudosButton from "@/components/atoms/GiveKudosButton/GiveKudosButton";
import { TeamValue, CategoryValue } from "@/shared/enums";

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
  filteredKudos: IKudos[];

  // Modal state
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  formData: IFormData;
  onFormSubmit: (data: IFormData) => void;

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
    className = "",
    testId,
  } = props;

  const handleClearAllFilters = () => {
    setSearchTerm("");
    setTeamFilter(teamOptions[0]);
    setCategoryFilter(categoryOptions[0]);
  };

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

        <KudosGrid kudos={filteredKudos} />
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
