import React from "react";
import { motion } from "framer-motion";
import Typography from "@/components/atoms/Typography";
import { ThumbsUpIcon, TrophyIcon, FlowerIcon } from "@/components/atoms/Icons";
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
  senderImage,
  className = "",
}: KudosCardProps) => {
  const getCategoryData = (category: string) => {
    const categoryMap: Record<
      string,
      { color: string; bgColor: string; icon: React.ReactNode; headerText: string }
    > = {
      Teamwork: {
        color: "#FFFFFF",
        bgColor: "#4B4DB2",
        icon: <Image src="/images/group.png" alt="Teamwork" width={100} height={100} />,
        headerText: "GREAT TEAMWORK!"
      },
      Innovation: {
        color: "#FFFFFF",
        bgColor: "#E85C41",
        icon: <Image src="/images/innovation.png" alt="Teamwork" width={100} height={100} />,
        headerText: "INNOVATION STAR!"
      },
      "Helping Hand": {
        color: "#FFFFFF",
        bgColor: "#D23B68",
        icon: <Image src="/images/helping.png" alt="Teamwork" width={100} height={100} />,
        headerText: "MANY THANKS!"
      },
      Leadership: {
        color: "#FFFFFF",
        bgColor: "#9C2DA3",
        icon: <Image src="/images/group.png" alt="Teamwork" width={100} height={100} />,
        headerText: "GREAT LEADERSHIP!"
      },
      Excellence: {
        color: "#FFFFFF",
        bgColor: "#26BBA9",
        icon: <Image src="/images/mind.png" alt="Teamwork" width={100} height={100} />,
        headerText: "EXCELLENT WORK!"
      },
    };
    return (
      categoryMap[category] || {
        color: "#FFFFFF",
        bgColor: "#A0CE4E",
        icon: <ThumbsUpIcon size={28} />,
        headerText: "WELL DONE!"
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
      whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
      className={`bg-white rounded-lg overflow-hidden border border-gray-200 h-full flex flex-col ${className}`}
    >
      {/* Colored Header */}
      <div
        className="px-4 py-2 text-center text-white font-bold tracking-wide"
        style={{ backgroundColor: categoryData.bgColor }}
      >
        {categoryData.headerText}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <div className="mr-3">
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
            </div>
            <div>
              <Typography variant="subtitle1" bold className="text-gray-900">
                {recipientName}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                {teamName} Team
              </Typography>
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center w-18 h-18">
            {categoryData.icon}
          </div>
        </div>

        <div className="mb-auto py-2 px-1">
          <Typography 
            variant="body1" 
            className="text-gray-700 leading-relaxed"
          >
            {message}
          </Typography>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center space-x-2">
            {senderImage ? (
              <Avatar
                src={senderImage}
                alt={createdBy}
                size="sm"
              />
            ) : (
              <Avatar
                initials={getInitials(createdBy)}
                size="sm"
                bgColor="secondary"
              />
            )}
            <div>
              <Typography variant="caption" className="text-gray-500 block">
                From
              </Typography>
              <Typography variant="body2" className="font-medium text-indigo-600">
                {createdBy}
              </Typography>
            </div>
          </div>
          <Typography variant="caption" className="text-gray-500">
            {createdAt}
          </Typography>
        </div>
      </div>
    </motion.div>
  );
};

export default KudosCard; 