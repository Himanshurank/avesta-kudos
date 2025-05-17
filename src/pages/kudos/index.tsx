import React, { useState } from "react";
import KudosPageTemplate from "@/components/templates/KudosPageTemplate";
import { TeamValue, CategoryValue } from "@/shared/enums";

// Mock data for demonstration
const mockKudos = [
  {
    id: "1",
    recipientName: "Sarah Johnson",
    teamName: "Engineering",
    category: "Teamwork",
    message:
      "Sarah went above and beyond to help our team complete the project ahead of schedule. Her collaborative spirit made all the difference!",
    createdBy: "Michael Chen",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    recipientName: "David Rodriguez",
    teamName: "Design",
    category: "Innovation",
    message:
      "David's creative solution to our UX challenge completely transformed the user experience. His innovative thinking is truly inspiring.",
    createdBy: "Priya Patel",
    createdAt: "3 days ago",
  },
  {
    id: "3",
    recipientName: "Emily Taylor",
    teamName: "Product",
    category: "Helping Hand",
    message:
      "Emily stepped in to help our team when we were short-staffed. Her willingness to assist others demonstrates true teamwork.",
    createdBy: "James Wilson",
    createdAt: "1 week ago",
  },
  {
    id: "4",
    recipientName: "Alex Martinez",
    teamName: "Engineering",
    category: "Excellence",
    message:
      "Alex's attention to detail and commitment to quality resulted in a flawless product launch. His excellence sets a high standard.",
    createdBy: "Lisa Thompson",
    createdAt: "1 week ago",
  },
  {
    id: "5",
    recipientName: "Olivia Kim",
    teamName: "Marketing",
    category: "Leadership",
    message:
      "Olivia expertly guided our team through a challenging campaign. Her leadership skills and strategic thinking were crucial to our success.",
    createdBy: "Robert Johnson",
    createdAt: "2 weeks ago",
  },
];

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
  // State management
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

  // Filter kudos based on current filters
  const filteredKudos = mockKudos.filter((kudos) => {
    const matchesSearch =
      kudos.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kudos.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kudos.createdBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTeam =
      teamFilter === "All Teams" || kudos.teamName === teamFilter;
    const matchesCategory =
      categoryFilter === "All Categories" || kudos.category === categoryFilter;

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
    />
  );
}
