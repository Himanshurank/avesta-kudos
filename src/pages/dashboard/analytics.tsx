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
