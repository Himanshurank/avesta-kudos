import React from "react";
import WelcomeCard from "@/components/molecules/WelcomeCard";
import StatCard from "@/components/molecules/StatCard";
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
      className={`grid grid-cols-1 gap-6 ${className}`}
      data-testid="user-dashboard-template"
    >
      <WelcomeCard userName={user.name} userRole="User" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Recent Kudos"
          value={12}
          icon="🌟"
          trend="up"
          percentage={8}
        />
        <StatCard
          title="Kudos Received"
          value={5}
          icon="👏"
          trend="up"
          percentage={12}
        />
        <StatCard
          title="Top Categories"
          value={3}
          icon="🏆"
          trend="same"
          percentage={0}
        />
      </div>

      <DashboardKudosWall kudosData={[]} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivityCard title="My Activity" activities={recentActivity} />
        <QuickActionsCard title="Quick Actions" actions={quickActions} />
      </div>
    </div>
  );
};

export default UserDashboardTemplate;
