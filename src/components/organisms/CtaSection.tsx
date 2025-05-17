import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ICtaSectionProps {
  className?: string;
  testId?: string;
}

const CtaSection = (props: ICtaSectionProps) => {
  const { className = "", testId } = props;

  const renderContent = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Recognizing Great Work Today
        </h2>
        <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
          Join thousands of teams already building a culture of appreciation
          with Digital Kudos Wall.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/auth/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Now
            </motion.button>
          </Link>
          <Link href="/auth/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors"
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      className={`py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white ${className}`}
      data-testid={testId || "cta-section"}
    >
      <div className="container mx-auto px-4 text-center">
        {renderContent()}
      </div>
    </section>
  );
};

export default CtaSection;
