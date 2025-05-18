import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TeamDataPoint {
  label: string;
  value: number;
  period: string;
}

interface TeamComparisonChartProps {
  className?: string;
  data?: TeamDataPoint[];
}

const TeamComparisonChart: React.FC<TeamComparisonChartProps> = ({
  className = "",
  data = [],
}) => {
  // Use real data or fallback to zero values
  const getChartData = () => {
    if (data && data.length > 0) {
      return {
        labels: data.map((item) => item.label),
        datasets: [
          {
            label: "Kudos Received",
            data: data.map((item) => item.value),
            backgroundColor: "rgba(99, 102, 241, 0.7)",
            borderColor: "rgba(99, 102, 241, 1)",
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      };
    }

    // Default teams when no data
    const teams = [
      "Engineering",
      "Product",
      "Marketing",
      "Sales",
      "Customer Support",
      "HR",
    ];

    // Return zero values instead of random data
    return {
      labels: teams,
      datasets: [
        {
          label: "Kudos Received",
          data: teams.map(() => 0),
          backgroundColor: "rgba(99, 102, 241, 0.7)",
          borderColor: "rgba(99, 102, 241, 1)",
          borderWidth: 1,
          borderRadius: 4,
        },
      ],
    };
  };

  const chartData = getChartData();

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
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TeamComparisonChart;
