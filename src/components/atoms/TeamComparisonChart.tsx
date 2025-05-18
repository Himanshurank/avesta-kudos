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

interface TeamComparisonChartProps {
  className?: string;
}

const TeamComparisonChart: React.FC<TeamComparisonChartProps> = ({
  className = "",
}) => {
  // Mock team data
  const teams = [
    "Engineering",
    "Product",
    "Marketing",
    "Sales",
    "Customer Support",
    "HR",
  ];
  
  // Mock kudos data
  const kudosReceived = teams.map(() => Math.floor(Math.random() * 40) + 15);
  const kudosGiven = teams.map(() => Math.floor(Math.random() * 35) + 10);
  
  const data = {
    labels: teams,
    datasets: [
      {
        label: "Kudos Received",
        data: kudosReceived,
        backgroundColor: "rgba(99, 102, 241, 0.7)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: "Kudos Given",
        data: kudosGiven,
        backgroundColor: "rgba(167, 139, 250, 0.7)",
        borderColor: "rgba(167, 139, 250, 1)",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

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
      <Bar data={data} options={options} />
    </div>
  );
};

export default TeamComparisonChart; 