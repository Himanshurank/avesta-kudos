import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/components/contexts/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import AnalyticsDashboardTemplate from "@/components/templates/AnalyticsDashboardTemplate";
import { container } from "@/core/shared/di/container";
import { StatisticsResponse } from "@/core/domain/valueObjects/AnalyticsTypes";

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
  const [timeRange, setTimeRange] = useState("monthly");
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [statistics, setStatistics] = useState<StatisticsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get use cases from container with memoization to prevent infinite renders
  const { getStatisticsUseCase } = useMemo(() => {
    return {
      getStatisticsUseCase: container.getStatisticsUseCase,
    };
  }, []);

  const timeRangeOptions: TimeRangeOption[] = [
    { value: "weekly", label: "Week" },
    { value: "monthly", label: "Month" },
    { value: "quarterly", label: "Quarter" },
    { value: "yearly", label: "Year" },
  ];

  // Load analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      // Only fetch if user is authenticated
      if (!user) return;

      setAnalyticsLoading(true);
      setError(null);

      try {
        // Determine date range based on selected timeRange
        const now = new Date();
        const startDate = new Date();

        if (timeRange === "weekly") {
          startDate.setDate(now.getDate() - 7);
        } else if (timeRange === "monthly") {
          startDate.setMonth(now.getMonth() - 1);
        } else if (timeRange === "quarterly") {
          startDate.setMonth(now.getMonth() - 3);
        } else if (timeRange === "yearly") {
          startDate.setFullYear(now.getFullYear() - 1);
        }

        // Format dates as ISO strings
        const startDateString = startDate.toISOString();
        const endDateString = now.toISOString();

        // Fetch statistics data
        const statisticsData = await getStatisticsUseCase.execute({
          startDate: startDateString,
          endDate: endDateString,
        });

        // Update state with fetched data
        setStatistics(statisticsData);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
        toast.error("Failed to load analytics data");
      } finally {
        setAnalyticsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [user, timeRange, getStatisticsUseCase]);

  // Convert API data to component format
  const getTopKudosReceivers = (): KudosReceiver[] => {
    if (!statistics) return [];

    return statistics.topReceivers.map((recipient, index) => ({
      id: index + 1,
      name: recipient.name,
      count: parseInt(recipient.receivedCount),
      trend: "up", // Note: API doesn't provide trend data, defaulting to "up"
    }));
  };

  const getTopCategories = (): Category[] => {
    if (!statistics) return [];

    const totalCount = statistics.kudosByCategory.reduce(
      (sum, category) => sum + parseInt(category.count),
      0
    );

    return statistics.kudosByCategory.map((category, index) => ({
      id: index + 1,
      name: category.categoryName,
      count: parseInt(category.count),
      percentage: Math.round((parseInt(category.count) / totalCount) * 100),
    }));
  };

  // Get summary card data
  const getSummaryCardsData = (): SummaryCardData[] => {
    if (!statistics) {
      return [
        {
          title: "Total Kudos",
          value: "0",
          trend: "0%",
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
          value: "0",
          trend: "0%",
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
    }

    // In a real app, calculate the trends based on previous period data
    return [
      {
        title: "Total Kudos",
        value: statistics.totalKudos.toString(),
        trend: "14.5%", // This would be calculated based on historical data
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
        value: (statistics.totalKudos / 40).toFixed(1), // Would divide by actual user count
        trend: "3.8%", // This would be calculated based on historical data
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
  };

  // Get chart data
  const getChartsData = () => {
    // Format labels according to the selected time range
    const formatChartLabels = () => {
      if (!statistics || !statistics.trendData) return [];

      return statistics.trendData.map((point) => {
        // Use periodLabel from API instead of custom formatting
        return {
          period: point.period,
          label: point.periodLabel,
          count: parseInt(point.count),
        };
      });
    };

    return [
      {
        title: "Kudos Over Time",
        description: `Displays the number of kudos given over the selected ${timeRange}`,
        data: statistics ? formatChartLabels() : [],
        timePeriod: statistics?.timePeriod || timeRange,
      },
      {
        title: "Team Comparison",
        description:
          "Shows kudos received by different teams with trend analysis",
        data:
          statistics?.kudosByTeam.map((team) => ({
            label: team.teamName,
            value: parseInt(team.count),
            period: team.periodLabel,
          })) || [],
      },
    ];
  };

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
      {analyticsLoading ? (
        <div className="flex items-center justify-center h-full py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-full py-16">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <AnalyticsDashboardTemplate
          timeRangeOptions={timeRangeOptions}
          selectedTimeRange={timeRange}
          onTimeRangeChange={handleTimeRangeChange}
          summaryCardsData={getSummaryCardsData()}
          chartsData={getChartsData()}
          topReceiversData={getTopKudosReceivers()}
          topCategoriesData={getTopCategories()}
          onViewFullReport={handleViewFullReport}
          onExportData={handleExportData}
        />
      )}
    </DashboardLayout>
  );
};

export default AnalyticsPage;
