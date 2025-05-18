import React, { useState } from "react";
import { motion } from "framer-motion";
import KudosLayout from "@/components/templates/KudosLayout";
import KudosCard from "@/components/molecules/KudosCard/KudosCard";

import router from "next/router";

// Mock data for demonstration
const myReceivedKudos = [
  {
    id: "1",
    recipientName: "You",
    teamName: "Engineering",
    category: "Excellence",
    message:
      "Your dedication to quality code and attention to detail has greatly improved our product. The refactoring you did last week made the application much more maintainable!",
    createdBy: "Sarah Johnson",
    createdAt: "1 week ago",
  },
  {
    id: "2",
    recipientName: "You",
    teamName: "Engineering",
    category: "Teamwork",
    message:
      "Thank you for staying late to help me debug that critical issue. Your collaborative spirit and technical expertise saved the day!",
    createdBy: "David Wilson",
    createdAt: "2 weeks ago",
  },
];

const myGivenKudos = [
  {
    id: "3",
    recipientName: "Emma Davis",
    teamName: "Design",
    category: "Innovation",
    message:
      "Your redesign of the dashboard is absolutely stunning! The new layout is both beautiful and functional, making complex data easy to understand.",
    createdBy: "You",
    createdAt: "3 days ago",
  },
  {
    id: "4",
    recipientName: "Michael Chen",
    teamName: "Product",
    category: "Leadership",
    message:
      "Your leadership during the last sprint was exceptional. You kept everyone focused and motivated even when we faced unexpected challenges.",
    createdBy: "You",
    createdAt: "1 month ago",
  },
];

export default function MyKudosPage() {
  const [activeTab, setActiveTab] = useState("my-kudos");
  const [viewMode, setViewMode] = useState<"received" | "given">("received");

  return (
    <>
      <KudosLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenKudosModal={() => router.push("/kudos/new")}
      >
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Kudos</h1>
                <p className="text-gray-600 mt-1">
                  View kudos you&apos;ve received and given to others
                </p>
              </div>
              <div className="mt-4 sm:mt-0 bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setViewMode("received")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "received"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Received
                </button>
                <button
                  onClick={() => setViewMode("given")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === "given"
                      ? "bg-indigo-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Given
                </button>
              </div>
            </div>

            <div className="border-b border-gray-200 mb-6"></div>

            {viewMode === "received" ? (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Kudos Received
                </h2>
                {myReceivedKudos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myReceivedKudos.map((kudos, index) => (
                      <motion.div
                        key={kudos.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                      >
                        <KudosCard
                          recipientName="You"
                          teamName={kudos.teamName}
                          category={kudos.category}
                          message={kudos.message}
                          createdBy={kudos.createdBy}
                          createdAt={kudos.createdAt}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="text-6xl mb-4">🏆</div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">
                      No kudos received yet
                    </h3>
                    <p className="text-gray-500">
                      Your received kudos will appear here
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Kudos Given
                </h2>
                {myGivenKudos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {myGivenKudos.map((kudos, index) => (
                      <motion.div
                        key={kudos.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                      >
                        <KudosCard
                          recipientName={kudos.recipientName}
                          teamName={kudos.teamName}
                          category={kudos.category}
                          message={kudos.message}
                          createdBy="You"
                          createdAt={kudos.createdAt}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="text-6xl mb-4">👋</div>
                    <h3 className="text-xl font-medium text-gray-700 mb-2">
                      No kudos given yet
                    </h3>
                    <p className="text-gray-500">
                      Your given kudos will appear here
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </KudosLayout>
    </>
  );
}
