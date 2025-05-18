import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import KudosLayout from "@/components/templates/KudosLayout";
import KudosCard from "@/components/molecules/KudosCard/KudosCard";
import router from "next/router";
import { useAuthContext } from "@/components/contexts/AuthContext";
import { kudosServices } from "@/core/shared/di/kudos";
import { Kudos } from "@/core/domain/entities/Kudos";
import toast from "react-hot-toast";

export default function MyKudosPage() {
  const [activeTab, setActiveTab] = useState("my-kudos");
  const [viewMode, setViewMode] = useState<"received" | "given">("received");
  const [myReceivedKudos, setMyReceivedKudos] = useState<Kudos[]>([]);
  const [myGivenKudos, setMyGivenKudos] = useState<Kudos[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    const fetchKudos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch received kudos
        const receivedResponse = await kudosServices.getUserKudosUseCase.execute(
          Number(user.id),
          "received"
        );
        
        // Fetch given kudos
        const givenResponse = await kudosServices.getUserKudosUseCase.execute(
          Number(user.id),
          "sent"
        );
        
        setMyReceivedKudos(Array.isArray(receivedResponse.data) 
          ? receivedResponse.data 
          : [receivedResponse.data as Kudos]);
        
        setMyGivenKudos(Array.isArray(givenResponse.data) 
          ? givenResponse.data 
          : [givenResponse.data as Kudos]);
      } catch (err) {
        console.error("Error fetching kudos:", err);
        setError("Failed to load your kudos. Please try again.");
        toast.error("Failed to load your kudos.");
      } finally {
        setLoading(false);
      }
    };

    fetchKudos();
  }, [user, viewMode]);

  const formatDate = (dateString: Date) => {
    // Simple function to format date as "X days/weeks/months ago"
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

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

            {/* Loading state */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-500">Loading your kudos...</p>
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
              <div className="text-center py-12 bg-red-50 rounded-lg">
                <div className="text-6xl mb-4">😟</div>
                <h3 className="text-xl font-medium text-red-700 mb-2">
                  Oops, something went wrong
                </h3>
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => router.reload()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Successful data load */}
            {!loading && !error && viewMode === "received" && (
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
                          teamName={kudos.team.name}
                          category={kudos.category.name}
                          message={kudos.message}
                          createdBy={kudos.createdBy.name}
                          createdAt={formatDate(kudos.createdAt)}
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
            )}

            {!loading && !error && viewMode === "given" && (
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
                          recipientName={kudos.recipients[0]?.name || "Unknown Recipient"}
                          teamName={kudos.team.name}
                          category={kudos.category.name}
                          message={kudos.message}
                          createdBy="You"
                          createdAt={formatDate(kudos.createdAt)}
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
