import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface IHeroSectionProps {
  className?: string;
  testId?: string;
}

const HeroSection = (props: IHeroSectionProps) => {
  const { className = "", testId } = props;

  const renderHeroContent = () => {
    return (
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Celebrate
          </span>
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Great Work
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Recognize your colleagues&apos; achievements and build a positive
          culture of appreciation with our interactive kudos platform.
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center md:justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/auth/login">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-lg"
            >
              Get Started
            </motion.button>
          </Link>
          <Link href="/auth/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-4 rounded-full font-bold"
            >
              Sign Up Free
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    );
  };

  const renderHeroImage = () => {
    return (
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative">
          {/* Decorative elements */}
          <motion.div
            className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Hero image/illustration */}
          <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
            {/* Example Kudos Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 relative overflow-hidden">
              <div className="w-16 h-16 absolute -right-4 -top-4 bg-yellow-200 rounded-full opacity-50" />
              <div className="w-8 h-8 absolute right-8 top-4 bg-indigo-200 rounded-full opacity-50" />

              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Sarah Johnson
                  </h3>
                  <p className="text-sm text-gray-500">Engineering Team</p>
                </div>
                <div className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  Teamwork
                </div>
              </div>

              <div className="border-l-4 border-indigo-400 pl-3 py-2 mb-4 italic text-gray-600">
                &ldquo;Thank you for stepping up and helping the team complete
                the project under a tight deadline. Your willingness to put in
                extra hours made all the difference!&rdquo;
              </div>

              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-500">👏 From: Michael Chen</div>
                <div className="text-gray-400">2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      className={`relative py-20 md:py-28 ${className}`}
      data-testid={testId || "hero-section"}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {renderHeroContent()}
          {renderHeroImage()}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
