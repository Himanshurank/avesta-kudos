import React from "react";
import { motion } from "framer-motion";

interface IFeaturesSectionProps {
  className?: string;
  testId?: string;
}

const FeaturesSection = (props: IFeaturesSectionProps) => {
  const { className = "", testId } = props;

  const renderFeatureHeader = () => {
    return (
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Features of Digital Kudos Wall
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our platform makes it easy to recognize achievements and build a
          positive workplace culture.
        </p>
      </motion.div>
    );
  };

  const renderFeatureCard = (
    emoji: string,
    title: string,
    description: string,
    bgColor: string,
    delay: number
  ) => {
    return (
      <motion.div
        className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
      >
        <div
          className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-6 text-2xl`}
        >
          {emoji}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    );
  };

  const renderFeatureCards = () => {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        {renderFeatureCard(
          "✨",
          "Public Recognition",
          "Celebrate achievements publicly and boost team morale with visible kudos on your team wall.",
          "bg-indigo-100",
          0.2
        )}

        {renderFeatureCard(
          "📊",
          "Insightful Analytics",
          "Track recognition patterns and trends with our detailed analytics dashboard.",
          "bg-purple-100",
          0.4
        )}

        {renderFeatureCard(
          "🔍",
          "Easy Filtering",
          "Find specific kudos by filtering through team, category, or recipient name.",
          "bg-blue-100",
          0.6
        )}
      </div>
    );
  };

  return (
    <section
      className={`py-20 bg-gradient-to-b from-white to-indigo-50 ${className}`}
      data-testid={testId || "features-section"}
    >
      <div className="container mx-auto px-4">
        {renderFeatureHeader()}
        {renderFeatureCards()}
      </div>
    </section>
  );
};

export default FeaturesSection;
