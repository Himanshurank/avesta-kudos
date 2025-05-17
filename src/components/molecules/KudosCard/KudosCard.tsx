import React from "react";
import { motion } from "framer-motion";
import { ThumbsUpIcon } from "@/components/atoms/Icons";
import Avatar from "@/components/atoms/Avatar";
import Image from "next/image";

type KudosCardProps = {
  recipientName: string;
  teamName: string;
  category: string;
  message: string;
  createdBy: string;
  createdAt: string;
  /**
   * Recipient image URL
   */
  recipientImage?: string;
  /**
   * Sender image URL
   */
  senderImage?: string;
  className?: string;
};

const KudosCard = ({
  recipientName,
  teamName,
  category,
  message,
  createdBy,
  createdAt,
  recipientImage,
  className = "",
}: KudosCardProps) => {
  const getCategoryData = (category: string) => {
    const categoryMap: Record<
      string,
      { 
        color: string; 
        bgColor: string; 
        gradientFrom: string;
        gradientTo: string;
        badgeBg: string;
        badgeText: string;
        icon: React.ReactNode; 
        headerText: string 
      }
    > = {
      Teamwork: {
        color: "#FFFFFF",
        bgColor: "#4B4DB2",
        gradientFrom: "#4B4DB2",
        gradientTo: "#6366F1",
        badgeBg: "#EEF2FF",
        badgeText: "#4F46E5",
        icon: <Image src="/images/group.png" alt="Teamwork" width={56} height={56} className="object-contain" />,
        headerText: "GREAT TEAMWORK"
      },
      Innovation: {
        color: "#FFFFFF",
        bgColor: "#E85C41",
        gradientFrom: "#E85C41",
        gradientTo: "#F97316",
        badgeBg: "#FFF7ED",
        badgeText: "#EA580C",
        icon: <Image src="/images/innovation.png" alt="Innovation" width={56} height={56} className="object-contain" />,
        headerText: "INNOVATION STAR"
      },
      "Helping Hand": {
        color: "#FFFFFF",
        bgColor: "#D23B68",
        gradientFrom: "#D23B68",
        gradientTo: "#EC4899",
        badgeBg: "#FDF2F8",
        badgeText: "#DB2777",
        icon: <Image src="/images/helping.png" alt="Helping Hand" width={56} height={56} className="object-contain" />,
        headerText: "MANY THANKS"
      },
      Leadership: {
        color: "#FFFFFF",
        bgColor: "#9C2DA3",
        gradientFrom: "#9C2DA3",
        gradientTo: "#C026D3",
        badgeBg: "#FAF5FF",
        badgeText: "#A21CAF",
        icon: <Image src="/images/group.png" alt="Leadership" width={56} height={56} className="object-contain" />,
        headerText: "GREAT LEADERSHIP"
      },
      Excellence: {
        color: "#FFFFFF",
        bgColor: "#26BBA9",
        gradientFrom: "#26BBA9",
        gradientTo: "#14B8A6",
        badgeBg: "#F0FDFA",
        badgeText: "#0D9488",
        icon: <Image src="/images/mind.png" alt="Excellence" width={56} height={56} className="object-contain" />,
        headerText: "EXCELLENT WORK"
      },
    };
    return (
      categoryMap[category] || {
        color: "#FFFFFF",
        bgColor: "#A0CE4E",
        gradientFrom: "#84CC16",
        gradientTo: "#A3E635",
        badgeBg: "#F7FEE7",
        badgeText: "#65A30D",
        icon: <ThumbsUpIcon size={28} />,
        headerText: "WELL DONE"
      }
    );
  };

  const categoryData = getCategoryData(category);

  // Get initial for avatar if no image is provided
  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]?.toUpperCase()).join('').slice(0, 2);
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col ${className}`}
      style={{
        WebkitBackdropFilter: "blur(10px)",
        backdropFilter: "blur(10px)"
      }}
    >
      {/* Colored Header with Gradient */}
      <div 
        className="px-5 py-4 text-white relative"
        style={{
          background: `linear-gradient(100deg, ${categoryData.gradientFrom}, ${categoryData.gradientTo} 70%, ${categoryData.gradientTo})`
        }}
      >
        <h3 className="font-bold tracking-wide text-lg">
          {categoryData.headerText}
        </h3>
        
        <div className="absolute top-0 right-0 w-16 h-16 opacity-40">
          {categoryData.icon}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-5">
        {/* Recipient Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            {recipientImage ? (
              <Avatar
                src={recipientImage}
                alt={recipientName}
                size="md"
              />
            ) : (
              <Avatar
                initials={getInitials(recipientName)}
                size="md"
                bgColor={category === "Leadership" ? "secondary" : "primary"}
              />
            )}
            <div 
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: categoryData.gradientFrom }}
            >
              <div className="w-3 h-3 text-white flex items-center justify-center">
                ★
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {recipientName}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {teamName} Team
              </span>
              <span 
                className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full"
                style={{ 
                  backgroundColor: categoryData.badgeBg,
                  color: categoryData.badgeText
                }}
              >
                {category}
              </span>
            </div>
          </div>
        </div>
        
        {/* Message Content */}
        <div className="relative">
          <div className="absolute -left-2 top-0 text-gray-200 dark:text-gray-700 text-4xl opacity-40">&ldquo;</div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-3 pr-3 italic">
            {message}
          </p>
          <div className="absolute -right-2 bottom-0 text-gray-200 dark:text-gray-700 text-4xl opacity-40">&rdquo;</div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">
                From
              </span>
              <span className="font-semibold text-sm" style={{ color: categoryData.badgeText }}>
                {createdBy}
              </span>
            </div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            {createdAt}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default KudosCard; 