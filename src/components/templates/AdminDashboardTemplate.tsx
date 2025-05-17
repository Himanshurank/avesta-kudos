import React from "react";
import WelcomeCard from "@/components/molecules/WelcomeCard";
import StatCard from "@/components/molecules/StatCard";
import RecentActivityCard from "@/components/molecules/RecentActivityCard";
import QuickActionsCard from "@/components/molecules/QuickActionsCard";
import { User } from "@/core/domain/entities/User";
import {
  HandThumbUpIcon,
  ChartBarIcon,
  UserGroupIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

interface AdminDashboardTemplateProps {
  user: User;
  className?: string;
}

const AdminDashboardTemplate = ({
  user,
  className = "",
}: AdminDashboardTemplateProps) => {
  const recentActivity = [
    { id: 1, text: "John gave kudos to Sarah", time: "2 hours ago" },
    { id: 2, text: "Team Engineering reached 100 kudos", time: "Yesterday" },
    { id: 3, text: "New category created: Innovation", time: "3 days ago" },
  ];

  const adminActions = [
    {
      label: "Give Kudos",
      path: "/kudos/give",
      colorClass: "",
      icon: <HandThumbUpIcon className="w-5 h-5" />,
      description: "Recognize a colleague's achievement",
    },
    {
      label: "View Analytics",
      path: "/dashboard/analytics",
      colorClass: "",
      icon: <ChartBarIcon className="w-5 h-5" />,
      description: "See insights and metrics about kudos",
    },
    {
      label: "Manage Teams",
      path: "/dashboard/manage-teams",
      colorClass: "",
      icon: <UserGroupIcon className="w-5 h-5" />,
      description: "Add or update team information",
    },
    {
      label: "Manage Categories",
      path: "/dashboard/manage-categories",
      colorClass: "",
      icon: <TagIcon className="w-5 h-5" />,
      description: "Create and edit kudos categories",
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 gap-6 ${className}`}
      data-testid="admin-dashboard-template"
    >
      <WelcomeCard userName={user.name} userRole="Admin" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Team Kudos"
          value={47}
          icon="🏆"
          trend="up"
          percentage={10}
        />
        <StatCard
          title="Monthly Activity"
          value={89}
          icon="📈"
          trend="up"
          percentage={23}
        />
        <StatCard
          title="Top Categories"
          value={5}
          icon="🏅"
          trend="same"
          percentage={0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivityCard
          title="Recent Team Activities"
          activities={recentActivity}
        />
        <QuickActionsCard title="Admin Actions" actions={adminActions} />
      </div>
    </div>
  );
};

export default AdminDashboardTemplate;
