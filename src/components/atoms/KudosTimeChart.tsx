import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface TimeDataPoint {
  period: string;
  label: string;
  count: number;
}

interface KudosTimeChartProps {
  timeRange: string;
  className?: string;
  data?: TimeDataPoint[];
  timePeriod?: string;
}

const KudosTimeChart: React.FC<KudosTimeChartProps> = ({
  timeRange,
  className = "",
  data = [],
}) => {
  // Generate appropriate labels based on the time range if no data is provided
  const getLabels = () => {
    // If we have real data, use that
    if (data && data.length > 0) {
      return data.map((point) => point.label);
    }

    // Otherwise use fallback labels based on timeRange
    switch (timeRange) {
      case "weekly":
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      case "monthly":
        return Array.from({ length: 30 }, (_, i) => `${i + 1}`);
      case "quarterly":
        return ["Jan", "Feb", "Mar"];
      case "yearly":
        return [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
      default:
        return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    }
  };

  // Get actual data counts or generate mock data
  const getDataValues = () => {
    if (data && data.length > 0) {
      return data.map((point) => point.count);
    }

    // Return zeros instead of random data when no data is available
    return getLabels().map(() => 0);
  };

  const labels = getLabels();
  const dataValues = getDataValues();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Kudos Given",
        data: dataValues,
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#6366F1",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Define a proper interface for the chart context
  interface ChartContext {
    parsed: {
      y: number;
    };
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          boxWidth: 6,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#111827",
        bodyColor: "#6B7280",
        borderColor: "rgba(229, 231, 235, 0.8)",
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
        callbacks: {
          label: function (context: ChartContext) {
            return `Kudos: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(229, 231, 235, 0.5)",
        },
        ticks: {
          font: {
            size: 10,
          },
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className={`w-full h-64 ${className}`}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default KudosTimeChart;
