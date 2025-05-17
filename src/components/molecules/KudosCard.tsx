import React from "react";
import { motion } from "framer-motion";

type KudosCardProps = {
  recipientName: string;
  teamName: string;
  category: string;
  message: string;
  createdBy: string;
  createdAt: string;
};

const KudosCard = ({
  recipientName,
  teamName,
  category,
  message,
  createdBy,
  createdAt,
}: KudosCardProps) => {
  const getCategoryData = (category: string) => {
    const categoryMap: Record<
      string,
      { color: string; bgColor: string; icon: string }
    > = {
      Teamwork: { color: "#805A00", bgColor: "#FFD166", icon: "👥" },
      Innovation: { color: "#00573F", bgColor: "#06D6A0", icon: "💡" },
      "Helping Hand": { color: "#FFFFFF", bgColor: "#EF476F", icon: "🤝" },
      Leadership: { color: "#FFFFFF", bgColor: "#118AB2", icon: "🏆" },
      Excellence: { color: "#FFFFFF", bgColor: "#9B5DE5", icon: "⭐" },
    };
    return (
      categoryMap[category] || { color: "#333", bgColor: "#EEE", icon: "✓" }
    );
  };

  const categoryData = getCategoryData(category);

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">
              {recipientName}
            </h3>
            <div className="text-sm text-gray-500">{teamName} Team</div>
          </div>
          <div
            className="flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium ml-2"
            style={{
              backgroundColor: categoryData.bgColor,
              color: categoryData.color,
            }}
          >
            <span className="mr-1">{categoryData.icon}</span>
            {category}
          </div>
        </div>

        <p className="text-gray-700 mb-4 border-l-4 border-indigo-200 pl-3 py-2 italic">
          &ldquo;{message}&rdquo;
        </p>

        <div className="flex justify-between items-center mt-6 text-sm">
          <div className="flex items-center text-gray-500">
            <span className="mr-1">👏</span>
            <span>
              From:{" "}
              <span className="font-medium text-indigo-600">{createdBy}</span>
            </span>
          </div>
          <div className="text-gray-400">{createdAt}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default KudosCard;
