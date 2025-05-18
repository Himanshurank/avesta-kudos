import React from "react";
import WelcomeCard from "@/components/molecules/WelcomeCard";
import StatCard from "@/components/molecules/StatCard";
import RecentActivityCard from "@/components/molecules/RecentActivityCard";
import QuickActionsCard from "@/components/molecules/QuickActionsCard";
import { User } from "@/core/domain/entities/User";
import {
  UserGroupIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

interface SuperAdminDashboardTemplateProps {
  user: User;
  className?: string;
}

const SuperAdminDashboardTemplate = ({
  user,
  className = "",
}: SuperAdminDashboardTemplateProps) => {
  const recentActivity = [
    { id: 1, text: "New user registration: Sarah Smith", time: "30 min ago" },
    {
      id: 2,
      text: "User role updated: Mark Johnson to Admin",
      time: "2 hours ago",
    },
    { id: 3, text: "Account approval: Alex Williams", time: "Yesterday" },
  ];

  const adminActions = [
    {
      label: "User Management",
      path: "/dashboard/user-management",
      colorClass: "",
      icon: <UserGroupIcon className="w-5 h-5" />,
      description: "Manage users and their access levels",
    },
    {
      label: "Approval Queue",
      path: "/dashboard/approval-queue",
      colorClass: "",
      icon: <ClockIcon className="w-5 h-5" />,
      description: "Review and approve pending user registrations",
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 gap-6 ${className}`}
      data-testid="super-admin-dashboard-template"
    >
      <WelcomeCard userName={user.name} userRole="Super Admin" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={85}
          icon="👥"
          trend="up"
          percentage={12}
        />
        <StatCard
          title="Pending Approvals"
          value={7}
          icon="⏳"
          trend="up"
          percentage={15}
        />
        <StatCard
          title="Total Kudos"
          value={324}
          icon="🌟"
          trend="up"
          percentage={8}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivityCard
          title="Recent User Activities"
          activities={recentActivity}
        />
        <QuickActionsCard
          title="Administrator Actions"
          actions={adminActions}
        />
      </div>
    </div>
  );
};

export default SuperAdminDashboardTemplate;
