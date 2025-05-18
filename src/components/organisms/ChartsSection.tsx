import React from "react";
import ChartCard from "@/components/molecules/ChartCard";

interface ChartData {
  title: string;
  description: string;
}

interface ChartsSectionProps {
  data: ChartData[];
  timeRange: string;
  className?: string;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({
  data,
  timeRange,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {data.map((chart, index) => (
        <ChartCard
          key={index}
          title={chart.title}
          description={chart.description}
          timeRange={timeRange}
        />
      ))}
    </div>
  );
};

export default ChartsSection;
