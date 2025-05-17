import React from "react";
import HeroSection from "@/components/organisms/HeroSection";
import FeaturesSection from "@/components/organisms/FeaturesSection";
import CtaSection from "@/components/organisms/CtaSection";

interface IHomeTemplateProps {
  className?: string;
  testId?: string;
}

const HomeTemplate = (props: IHomeTemplateProps) => {
  const { className = "", testId } = props;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      data-testid={testId || "home-template"}
    >
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  );
};

export default HomeTemplate;
