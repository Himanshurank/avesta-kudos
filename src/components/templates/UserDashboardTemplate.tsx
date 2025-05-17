import React from "react";
import WelcomeCard from "@/components/molecules/WelcomeCard";
import RecentActivityCard from "@/components/molecules/RecentActivityCard";
import DashboardKudosWall from "@/components/organisms/DashboardKudosWall";
import QuickActionsCard from "@/components/molecules/QuickActionsCard";
import { User } from "@/core/domain/entities/User";
import { EyeIcon, StarIcon, UserIcon } from "@heroicons/react/24/outline";

interface UserDashboardTemplateProps {
  user: User;
  className?: string;
}

const UserDashboardTemplate = ({
  user,
  className = "",
}: UserDashboardTemplateProps) => {
  const recentActivity = [
    { id: 1, text: "You received kudos from Mark Johnson", time: "Yesterday" },
    { id: 2, text: "You received kudos from Sarah Li", time: "Last week" },
    { id: 3, text: "You viewed 5 new kudos", time: "2 days ago" },
  ];

  const quickActions = [
    {
      label: "Full Kudos Wall",
      path: "/kudos/wall",
      colorClass: "",
      icon: <EyeIcon className="w-5 h-5" />,
      description: "Browse all kudos across the organization",
    },
    {
      label: "My Received Kudos",
      path: "/kudos/my-received",
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

  return (
    <div
      className={`grid grid-cols-1 gap-8 ${className}`}
      data-testid="user-dashboard-template"
    >
      <WelcomeCard userName={user.name} userRole="User" />

      {/* Kudos Wall - Now Featured More Prominently as the Main Dashboard Element */}
      <div className="mb-2">
        <DashboardKudosWall kudosData={[]} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivityCard title="My Activity" activities={recentActivity} />
        <QuickActionsCard title="Quick Actions" actions={quickActions} />
      </div>
    </div>
  );
};

export default UserDashboardTemplate;
