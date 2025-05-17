import React, { useState, useEffect } from "react";
import KudosPageTemplate from "@/components/templates/KudosPageTemplate";
import { TeamValue, CategoryValue } from "@/shared/enums";
import { useKudos } from "@/components/hooks/useKudos";
import { KudosFilter } from "@/core/domain/interfaces/IKudosRepository";
import { Kudos } from "@/core/domain/entities/Kudos";

// Available filter options
const teams = [
  "All Teams",
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Customer Success",
];
const categories = [
  "All Categories",
  "Teamwork",
  "Innovation",
  "Helping Hand",
  "Leadership",
  "Excellence",
];

export default function KudosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("kudos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: "",
    teamName: "" as TeamValue,
    category: "" as CategoryValue,
    message: "",
  });

  // Setup filter for API call
  const [apiFilter, setApiFilter] = useState<KudosFilter>({});
  const { kudos, loading, error, pagination, updateFilter, updatePage } =
    useKudos(apiFilter);

  // Update API filter when UI filters change
  useEffect(() => {
    const newFilter: KudosFilter = {};

    // Add search filter
    if (searchTerm) {
      newFilter.search = searchTerm;
    }

    // Add team filter
    if (teamFilter !== "All Teams") {
      // In a real implementation, you would map the team name to an ID
      const teamMap: Record<string, number> = {
        Engineering: 1,
        Design: 2,
        Product: 3,
        Marketing: 4,
        Sales: 5,
        "Customer Success": 6,
      };
      newFilter.teamId = teamMap[teamFilter];
    }

    // Add category filter
    if (categoryFilter !== "All Categories") {
      // In a real implementation, you would map the category name to an ID
      const categoryMap: Record<string, number> = {
        Teamwork: 1,
        Innovation: 2,
        "Helping Hand": 3,
        Leadership: 4,
        Excellence: 5,
      };
      newFilter.categoryId = categoryMap[categoryFilter];
    }

    setApiFilter(newFilter);
    updateFilter(newFilter);
  }, [searchTerm, teamFilter, categoryFilter]);

  // Client-side filtering for cases where the API doesn't support certain filters
  // or for immediate feedback while waiting for API response
  const filteredKudos = kudos.filter((kudos: Kudos) => {
    const matchesSearch = searchTerm
      ? kudos.recipients.some((r) =>
          r.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        kudos.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kudos.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesTeam =
      teamFilter === "All Teams" || kudos.team.name === teamFilter;
    const matchesCategory =
      categoryFilter === "All Categories" ||
      kudos.category.name === categoryFilter;

    return matchesSearch && matchesTeam && matchesCategory;
  });

  // Form submission handler
  const handleFormSubmit = (data: typeof formData) => {
    console.log("Form submitted:", data);
    // Reset form and close modal
    setFormData({
      recipientName: "",
      teamName: "" as TeamValue,
      category: "" as CategoryValue,
      message: "",
    });
    setIsModalOpen(false);

    // In a real implementation, you would call the CreateKudosUseCase here
  };

  return (
    <KudosPageTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      teamFilter={teamFilter}
      setTeamFilter={setTeamFilter}
      teamOptions={teams}
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
      categoryOptions={categories}
      filteredKudos={filteredKudos}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      formData={formData}
      onFormSubmit={handleFormSubmit}
      isLoading={loading}
      error={error?.message}
      pagination={pagination}
      onPageChange={updatePage}
    />
  );
}
