import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/components/contexts/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import AnalyticsDashboardTemplate from "@/components/templates/AnalyticsDashboardTemplate";

// Define interfaces for strong typing
interface KudosReceiver {
  id: number;
  name: string;
  count: number;
  trend: "up" | "down" | "same";
}

interface Category {
  id: number;
  name: string;
  count: number;
  percentage: number;
}

interface TimeRangeOption {
  value: string;
  label: string;
}

interface SummaryCardData {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon: React.ReactNode;
  bgColor: string;
}

const AnalyticsPage = () => {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  // State management
  const [activeTab, setActiveTab] = useState("analytics");
  const [timeRange, setTimeRange] = useState("month");

  // Mock data (in a real app, this would come from API calls)
  const topKudosReceivers: KudosReceiver[] = [
    { id: 1, name: "Sarah Johnson", count: 18, trend: "up" },
    { id: 2, name: "Michael Chen", count: 15, trend: "up" },
    { id: 3, name: "David Wilson", count: 12, trend: "down" },
    { id: 4, name: "Olivia Martinez", count: 10, trend: "same" },
    { id: 5, name: "James Taylor", count: 8, trend: "up" },
  ];

  const topCategories: Category[] = [
    { id: 1, name: "Teamwork", count: 42, percentage: 35 },
    { id: 2, name: "Innovation", count: 27, percentage: 22.5 },
    { id: 3, name: "Customer Focus", count: 24, percentage: 20 },
    { id: 4, name: "Leadership", count: 18, percentage: 15 },
    { id: 5, name: "Problem Solving", count: 9, percentage: 7.5 },
  ];

  const timeRangeOptions: TimeRangeOption[] = [
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "quarter", label: "Quarter" },
    { value: "year", label: "Year" },
  ];

  // Get summary card data
  const getSummaryCardsData = (): SummaryCardData[] => [
    {
      title: "Total Kudos",
      value: "273",
      trend: "14.5%",
      trendDirection: "up",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-blue-600"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 16V12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8H12.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Users",
      value: "42",
      trend: "7.2%",
      trendDirection: "up",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-purple-600"
        >
          <path
            d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bgColor: "bg-purple-100",
    },
    {
      title: "Avg. Kudos per User",
      value: "6.5",
      trend: "3.8%",
      trendDirection: "up",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-green-600"
        >
          <path
            d="M12 8V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12H16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bgColor: "bg-green-100",
    },
    {
      title: "Engagement Rate",
      value: "78%",
      trend: "2.1%",
      trendDirection: "down",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-600"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 9H9.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 9H15.01"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bgColor: "bg-yellow-100",
    },
  ];

  // Get chart data
  const getChartsData = () => [
    {
      title: "Kudos Over Time",
      description: `Displays the number of kudos given per day over the selected ${timeRange}`,
    },
    {
      title: "Team Comparison",
      description:
        "Shows kudos received by different teams with trend analysis",
    },
  ];

  // Check user authentication and authorization
  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      toast.error("Please login to access the dashboard");
      router.push("/auth/login");
      return;
    }

    // If user is not an admin or super admin, redirect to dashboard
    if (
      !loading &&
      user &&
      !(
        user.roles &&
        (user.roles.some((role) => role.name === "ADMIN") ||
          user.roles.some((role) => role.name === "SUPER_ADMIN"))
      )
    ) {
      toast.error("You don't have permission to access this page");
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Event handlers
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  const handleViewFullReport = () => {
    toast.success("This would navigate to detailed reports in a full app");
  };

  const handleExportData = () => {
    toast.success("This would export data in a full app");
  };

  // If still loading or no user, show loading screen
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      user={user}
    >
      <AnalyticsDashboardTemplate
        timeRangeOptions={timeRangeOptions}
        selectedTimeRange={timeRange}
        onTimeRangeChange={handleTimeRangeChange}
        summaryCardsData={getSummaryCardsData()}
        chartsData={getChartsData()}
        topReceiversData={topKudosReceivers}
        topCategoriesData={topCategories}
        onViewFullReport={handleViewFullReport}
        onExportData={handleExportData}
      />
    </DashboardLayout>
  );
};

export default AnalyticsPage;
