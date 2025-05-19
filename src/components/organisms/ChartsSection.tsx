import React from "react";
import ChartCard from "@/components/molecules/ChartCard";

// Reuse the same chart data type from ChartCard
interface TimeDataPoint {
  period: string;
  label: string;
  count: number;
}

interface TeamDataPoint {
  label: string;
  value: number;
  period: string;
}

type ChartDataType = TimeDataPoint[] | TeamDataPoint[];

interface ChartData {
  title: string;
  description: string;
  data?: ChartDataType;
  timePeriod?: string;
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
          data={chart.data}
          timePeriod={chart.timePeriod}
        />
      ))}
    </div>
  );
};

export default ChartsSection;
