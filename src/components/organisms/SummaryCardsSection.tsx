import React from "react";
import SummaryCard from "@/components/molecules/SummaryCard";

interface SummaryCardData {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down";
  icon: React.ReactNode;
  bgColor: string;
}

interface SummaryCardsSectionProps {
  data: SummaryCardData[];
  timeRange: string;
  className?: string;
}

const SummaryCardsSection: React.FC<SummaryCardsSectionProps> = ({
  data,
  timeRange,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${className}`}>
      {data.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          value={card.value}
          trend={card.trend}
          trendDirection={card.trendDirection}
          icon={card.icon}
          bgColor={card.bgColor}
          timeRange={timeRange}
        />
      ))}
    </div>
  );
};

export default SummaryCardsSection;
