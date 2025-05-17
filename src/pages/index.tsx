import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/components/layouts/MainLayout";
import KudosFilter from "@/components/organisms/KudosFilter";

// Mock data for UI visualization purposes only
const mockKudos = [
  {
    id: "1",
    recipientName: "Sarah Johnson",
    teamName: "Engineering",
    category: "Teamwork",
    message:
      "Thank you for stepping up and helping the team complete the project under a tight deadline. Your willingness to put in extra hours and mentor junior developers made all the difference!",
    createdBy: "Michael Chen",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    recipientName: "David Rodriguez",
    teamName: "Design",
    category: "Innovation",
    message:
      "Your redesign of our onboarding flow has received amazing feedback from users. The thoughtful animations and clear instructions have reduced our drop-off rate by 35%!",
    createdBy: "Emily Williams",
    createdAt: "3 days ago",
  },
  {
    id: "3",
    recipientName: "Alex Patel",
    teamName: "Product",
    category: "Leadership",
    message:
      "Your leadership during our quarterly planning session helped us prioritize the right features. Everyone felt heard and the roadmap is both ambitious and achievable.",
    createdBy: "Jessica Lee",
    createdAt: "5 days ago",
  },
  {
    id: "4",
    recipientName: "Michelle Thompson",
    teamName: "Marketing",
    category: "Helping Hand",
    message:
      "Thank you for taking the time to help me understand the analytics dashboard. Your patience and clear explanations have made me much more confident in using data to drive decisions.",
    createdBy: "Robert Kim",
    createdAt: "1 week ago",
  },
  {
    id: "5",
    recipientName: "James Wilson",
    teamName: "Engineering",
    category: "Excellence",
    message:
      "The refactoring you did on our authentication service is impressive. Code is cleaner, tests are more comprehensive, and performance has improved by 60%. Outstanding work!",
    createdBy: "Sophia Garcia",
    createdAt: "1 week ago",
  },
];

// Category colors for visual distinction
const categoryColors: Record<
  string,
  { bg: string; text: string; icon: string }
> = {
  Teamwork: { bg: "#FFD166", text: "#805A00", icon: "👥" },
  Innovation: { bg: "#06D6A0", text: "#00573F", icon: "💡" },
  Leadership: { bg: "#118AB2", text: "#FFFFFF", icon: "🏆" },
  "Helping Hand": { bg: "#EF476F", text: "#FFFFFF", icon: "🤝" },
  Excellence: { bg: "#9B5DE5", text: "#FFFFFF", icon: "⭐" },
};

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
    },
  },
};

// Floating animation for decorative elements
const floatingAnimation = {
  y: [0, -15, 0],
  transition: {
    duration: 5,
    repeat: Infinity,
    repeatType: "mirror" as const,
  },
};

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [sortOption, setSortOption] = useState("Newest");

  // Filter functions
  const categories = [
    "All",
    "Teamwork",
    "Innovation",
    "Leadership",
    "Helping Hand",
    "Excellence",
  ];

  return (
    <MainLayout>
      <div className="relative min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
          {/* Hero Section with enhanced animations */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl mb-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 z-0"></div>

            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute top-0 left-0 w-full h-full bg-white opacity-10"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                }}
              ></div>
            </div>

            <div className="relative p-10 md:p-16 z-10">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex-1 text-center md:text-left"
                >
                  <motion.h1
                    className="text-5xl md:text-6xl font-bold mb-6 text-white"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                      Celebrate
                    </span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                      Great Work
                    </span>
                  </motion.h1>

                  <motion.p
                    className="text-blue-100 text-xl mb-8 max-w-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    Recognize your colleagues&apos; achievements and build a
                    positive culture of appreciation with our interactive kudos
                    platform.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex flex-wrap gap-4 justify-center md:justify-start"
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowModal(true)}
                      className="bg-white text-indigo-700 hover:text-indigo-800 px-8 py-4 rounded-full font-bold shadow-lg flex items-center gap-2 transform transition-all"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <span className="text-xl">✨</span>
                      <span>Give Kudos</span>
                      <motion.span
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        →
                      </motion.span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-transparent text-white border-2 border-white/30 hover:border-white/80 px-8 py-4 rounded-full font-bold transition-all"
                    >
                      How It Works
                    </motion.button>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="hidden md:block"
                >
                  <motion.div
                    animate={floatingAnimation}
                    className="relative w-72 h-72 -mr-8"
                  >
                    <div className="absolute top-0 left-0 w-60 h-60 bg-blue-400 rounded-2xl rotate-12 opacity-70"></div>
                    <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-400 rounded-2xl -rotate-12 opacity-70"></div>
                    <div className="absolute inset-4 bg-white rounded-2xl shadow-xl flex items-center justify-center p-6">
                      <div className="text-6xl">🎉</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Category Filters - Horizontal pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-10 overflow-x-auto p-2 -mx-2"
          >
            <div className="flex gap-2 sm:gap-3 min-w-max">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-3 rounded-full font-medium transition-all ${
                    activeCategory === category
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-600 hover:bg-gray-50 shadow"
                  }`}
                >
                  {category !== "All" && (
                    <span className="mr-2">
                      {categoryColors[category].icon}
                    </span>
                  )}
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with advanced filters */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-80"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden sticky top-6">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white">
                  <h3 className="text-xl font-bold">Advanced Filters</h3>
                </div>
                <div className="p-6">
                  <KudosFilter />
                </div>
              </div>
            </motion.div>

            {/* Main content area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1"
            >
              {/* Header with sorting options */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-700"
                >
                  Recent Kudos
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex items-center bg-white rounded-full px-4 py-2 shadow-md"
                >
                  <span className="text-gray-500 mr-2">Sort by:</span>
                  <select
                    className="bg-transparent border-none focus:ring-0 text-indigo-700 font-medium cursor-pointer"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option>Newest</option>
                    <option>Oldest</option>
                    <option>Team</option>
                    <option>Category</option>
                  </select>
                </motion.div>
              </div>

              {/* Kudos grid with enhanced cards */}
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid md:grid-cols-2 gap-6"
              >
                {mockKudos.map((kudos) => {
                  const categoryColor = categoryColors[kudos.category] || {
                    bg: "#EEE",
                    text: "#333",
                    icon: "✓",
                  };

                  return (
                    <motion.div key={kudos.id} variants={item}>
                      <motion.div
                        whileHover={{
                          y: -5,
                          boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)",
                        }}
                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full"
                      >
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg mb-1">
                                {kudos.recipientName}
                              </h3>
                              <div className="text-sm text-gray-500">
                                {kudos.teamName} Team
                              </div>
                            </div>
                            <div
                              className="flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium ml-2"
                              style={{
                                backgroundColor: categoryColor.bg,
                                color: categoryColor.text,
                              }}
                            >
                              <span className="mr-1">{categoryColor.icon}</span>
                              {kudos.category}
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4 border-l-4 border-indigo-200 pl-3 py-2 italic">
                            &ldquo;{kudos.message}&rdquo;
                          </p>

                          <div className="flex justify-between items-center mt-6 text-sm">
                            <div className="flex items-center text-gray-500">
                              <span className="mr-1">👏</span>
                              <span>
                                From:{" "}
                                <span className="font-medium text-indigo-600">
                                  {kudos.createdBy}
                                </span>
                              </span>
                            </div>
                            <div className="text-gray-400">
                              {kudos.createdAt}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Load More Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-10 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-full font-bold shadow-lg"
                >
                  Load More Kudos
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Modal for giving kudos */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white rounded-xl w-full max-w-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                  <h3 className="text-2xl font-bold">Give Kudos</h3>
                  <p className="text-indigo-100">
                    Recognize someone&apos;s great work!
                  </p>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Recipient
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Who deserves recognition?"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Category
                    </label>
                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="">Select a category</option>
                      {categories
                        .filter((c) => c !== "All")
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                      placeholder="Why do you appreciate them?"
                    ></textarea>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium">
                      Send Kudos
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
