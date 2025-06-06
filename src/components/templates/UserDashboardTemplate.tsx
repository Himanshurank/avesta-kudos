import React, { useState, useEffect } from "react";
import WelcomeCard from "@/components/molecules/WelcomeCard";
import RecentActivityCard from "@/components/molecules/RecentActivityCard";
import QuickActionsCard from "@/components/molecules/QuickActionsCard";
import { User } from "@/core/domain/entities/User";
import { EyeIcon, StarIcon, UserIcon } from "@heroicons/react/24/outline";

import KudosFilterPanel from "../organisms/KudosFilterPanel";
import KudosGrid from "../organisms/KudosGrid";
import { GetAllKudosApiResponse } from "@/core/infrastructure/repositories/KudosRepositoryImpl";

// Define the KudosApiData type based on what we see in the repository
interface KudosApiData {
  id: number;
  message: string;
  createdBy: {
    id: number;
    name: string;
  };
  recipients: Array<{
    id: number;
    name: string;
  }>;
  team: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface UserDashboardTemplateProps {
  user: User;
  className?: string;
  initialKudosData: GetAllKudosApiResponse | null;
}

const UserDashboardTemplate = ({
  user,
  className = "",
  initialKudosData,
}: UserDashboardTemplateProps) => {
  // Add required state variables
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, teamFilter, categoryFilter]);

  const handleClearAllFilters = () => {
    setSearchTerm("");
    setTeamFilter("All Teams");
    setCategoryFilter("All Categories");
  };

  // Render pagination controls
  const renderPagination = () => (
    <div className="flex justify-center mt-6">
      <span className="text-gray-500">Pagination controls here</span>
    </div>
  );

  const recentActivity = [
    { id: 1, text: "You received kudos from Mark Johnson", time: "Yesterday" },
    { id: 2, text: "You received kudos from Sarah Li", time: "Last week" },
    { id: 3, text: "You viewed 5 new kudos", time: "2 days ago" },
  ];

  const quickActions = [
    {
      label: "Full Kudos Wall",
      path: "/kudos",
      colorClass: "",
      icon: <EyeIcon className="w-5 h-5" />,
      description: "Browse all kudos across the organization",
    },
    {
      label: "My Received Kudos",
      path: "/kudos/my-kudos",
      colorClass: "",
      icon: <StarIcon className="w-5 h-5" />,
      description: "View kudos others have given you",
    },
    {
      label: "View Profile",
      path: "/dashboard/profile",
      colorClass: "",
      icon: <UserIcon className="w-5 h-5" />,
      description: "Manage your personal information",
    },
  ];
  const transformKudosForDisplay = (kudos: KudosApiData) => {
    // Check if recipients is an array, and if not, handle it gracefully
    let recipientNames = "Unknown";

    if (Array.isArray(kudos.recipients)) {
      recipientNames = kudos.recipients.map((r) => r.name).join(", ");
    } else if (
      typeof kudos.recipients === "object" &&
      kudos.recipients !== null
    ) {
      // Handle the case where recipients might be a single object
      const singleRecipient = kudos.recipients as unknown as { name?: string };
      recipientNames = singleRecipient.name || "Unknown";
    }

    return {
      id: kudos.id.toString(),
      recipientName: recipientNames,
      teamName: kudos.team?.name || "Unknown Team",
      category: kudos.category?.name || "Unknown Category",
      message: kudos.message || "",
      createdBy: kudos.createdBy?.name || "Unknown",
      createdAt: new Date(kudos.createdAt).toLocaleDateString(),
    };
  };

  return (
    <div
      className={`grid grid-cols-1 gap-8 ${className}`}
      data-testid="user-dashboard-template"
    >
      <WelcomeCard userName={user.name} userRole="User" />

      <KudosFilterPanel
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        teamFilter={teamFilter}
        onTeamFilterChange={setTeamFilter}
        teamOptions={[
          "All Teams",
          ...(initialKudosData?.teams?.map((team) => team.name) || []),
        ]}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        categoryOptions={[
          "All Categories",
          ...(initialKudosData?.categories?.map((category) => category.name) ||
            []),
        ]}
        onClearAllFilters={handleClearAllFilters}
      />

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          <KudosGrid
            kudos={initialKudosData?.kudos?.map(transformKudosForDisplay) || []}
          />
          {renderPagination()}
        </>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivityCard title="My Activity" activities={recentActivity} />
        <QuickActionsCard title="Quick Actions" actions={quickActions} />
      </div>
    </div>
  );
};

export default UserDashboardTemplate;
