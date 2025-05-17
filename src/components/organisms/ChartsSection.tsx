import React from "react";
import ChartCard from "@/components/molecules/ChartCard";

interface ChartData {
  title: string;
  description: string;
}

interface ChartsSectionProps {
  data: ChartData[];
  className?: string;
}

const ChartsSection: React.FC<ChartsSectionProps> = ({
  data,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {data.map((chart, index) => (
        <ChartCard
          key={index}
          title={chart.title}
          description={chart.description}
        />
      ))}
    </div>
  );
};

export default ChartsSection;
