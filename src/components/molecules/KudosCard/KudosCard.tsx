import React from "react";
import { motion } from "framer-motion";
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
      {
        primaryColor: string;
        secondaryColor: string;
        iconPath: string;
        emoji: string;
      }
    > = {
      Teamwork: {
        primaryColor: "#E6F2FF",
        secondaryColor: "#95B8D1",
        iconPath: "/images/group.png",
        emoji: "🤝",
      },
      Innovation: {
        primaryColor: "#FFF1E6",
        secondaryColor: "#F8B195",
        iconPath: "/images/innovation.png",
        emoji: "💡",
      },
      "Helping Hand": {
        primaryColor: "#F8E1F4",
        secondaryColor: "#DDA0DD",
        iconPath: "/images/helping.png",
        emoji: "🙌",
      },
      Leadership: {
        primaryColor: "#E6E6FA",
        secondaryColor: "#B5A8D1",
        iconPath: "/images/group.png",
        emoji: "🌟",
      },
      Excellence: {
        primaryColor: "#E0F8E9",
        secondaryColor: "#A8D8B9",
        iconPath: "/images/mind.png",
        emoji: "🏆",
      },
    };
    return (
      categoryMap[category] || {
        primaryColor: "#F4F9E9",
        secondaryColor: "#C7DDBC",
        iconPath: "/images/mind.png",
        emoji: "✨",
      }
    );
  };

  const categoryData = getCategoryData(category);

  // Get initial for avatar if no image is provided
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    // Check if the string is already in a relative format (e.g., "1 week ago")
    if (
      dateString.includes("ago") ||
      dateString.includes("day") ||
      dateString.includes("week") ||
      dateString.includes("month") ||
      dateString.includes("year")
    ) {
      return dateString;
    }

    try {
      const date = new Date(dateString);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return dateString; // Return the original string if date is invalid
      }
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    } catch {
      // If any error occurs during formatting, return the original string
      return dateString;
    }
  };

  const getAvatarBgColor = () => {
    const colorMap: Record<
      string,
      | "primary"
      | "secondary"
      | "gray"
      | "indigo"
      | "purple"
      | "green"
      | "yellow"
      | "red"
    > = {
      Teamwork: "indigo",
      Innovation: "yellow",
      "Helping Hand": "purple",
      Leadership: "primary",
      Excellence: "green",
    };
    return colorMap[category] || "secondary";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 10px 10px -5px rgba(0, 0, 0, 0.03)",
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      className={`rounded-xl overflow-hidden backdrop-blur-sm ${className} relative`}
      style={{
        background: `linear-gradient(to bottom right, white, ${categoryData.primaryColor}50)`,
        boxShadow:
          "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
        border: `2px solid ${categoryData.secondaryColor}40`,
        outline: `1px solid ${categoryData.secondaryColor}20`,
        outlineOffset: "-5px",
      }}
    >
      {/* Background Icon */}
      <div className="absolute right-0 bottom-0 w-40 h-40 overflow-hidden opacity-10 z-0 transform rotate-12">
        <Image
          src={categoryData.iconPath}
          alt="Category icon"
          width={160}
          height={160}
          className="object-contain"
        />
      </div>

      {/* Kudos Content with Better Spacing */}
      <div className="p-6 relative z-10">
        {/* Recipient Info */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div
                className="absolute inset-0 rounded-full blur-sm opacity-40"
                style={{ background: categoryData.secondaryColor }}
              ></div>
              <Avatar
                src={recipientImage}
                alt={recipientName}
                initials={getInitials(recipientName)}
                size="lg"
                bgColor={getAvatarBgColor()}
                className="relative z-10 ring-2 ring-white"
              />
            </motion.div>
            <div>
              <h4 className="font-bold text-gray-700 text-lg">{recipientName}</h4>
              <p className="text-sm font-medium text-gray-500">{teamName}</p>
            </div>
          </div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: `${categoryData.secondaryColor}40`,
              border: `1px solid ${categoryData.secondaryColor}60`,
            }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: categoryData.secondaryColor }}
            ></div>
            <span
              className="text-xs font-semibold"
              style={{
                color: categoryData.secondaryColor,
                filter: "brightness(0.6)",
              }}
            >
              {category}
            </span>
          </motion.div>
        </div>

        {/* Message with Quote Design */}
        <div className="my-6">
          <div
            className="relative px-5 py-4 rounded-xl"
            style={{ background: `${categoryData.primaryColor}70` }}
          >
            <div
              className="absolute top-0 left-4 transform -translate-y-1/2 px-2"
              style={{ color: categoryData.secondaryColor }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33333 20C8.27111 20 7.38667 19.6364 6.68 18.9091C5.97333 18.1818 5.62667 17.2727 5.62667 16.1818C5.62667 15.6364 5.73333 15.0909 5.94667 14.5455C6.16 14 6.48 13.4091 6.90667 12.7727C7.33333 12.1364 7.88 11.4545 8.54667 10.7273C9.21333 10 10.0267 9.18182 10.9867 8.27273L13.3333 10.4545C12.6667 11.0909 12.08 11.7273 11.5733 12.3636C11.0667 13 10.64 13.6364 10.2933 14.2727C9.94667 14.9091 9.77333 15.5455 9.77333 16.1818C9.77333 16.3636 9.82667 16.5455 9.93333 16.7273C10.04 16.9091 10.2 17 10.4133 17H13.3333C14.3956 17 15.28 17.3712 15.9867 18.1136C16.6933 18.8561 17.0467 19.7727 17.0467 20.8636C17.0467 21.9545 16.6933 22.8712 15.9867 23.6136C15.28 24.3561 14.3956 24.7273 13.3333 24.7273C12.2711 24.7273 11.3867 24.3561 10.68 23.6136C9.97333 22.8712 9.62 21.9545 9.62 20.8636V20H9.33333ZM22.6667 20C21.6044 20 20.72 19.6364 20.0133 18.9091C19.3067 18.1818 18.96 17.2727 18.96 16.1818C18.96 15.6364 19.0667 15.0909 19.28 14.5455C19.4933 14 19.8133 13.4091 20.24 12.7727C20.6667 12.1364 21.2133 11.4545 21.88 10.7273C22.5467 10 23.36 9.18182 24.32 8.27273L26.6667 10.4545C26 11.0909 25.4133 11.7273 24.9067 12.3636C24.4 13 23.9733 13.6364 23.6267 14.2727C23.28 14.9091 23.1067 15.5455 23.1067 16.1818C23.1067 16.3636 23.16 16.5455 23.2667 16.7273C23.3733 16.9091 23.5333 17 23.7467 17H26.6667C27.7289 17 28.6133 17.3712 29.32 18.1136C30.0267 18.8561 30.38 19.7727 30.38 20.8636C30.38 21.9545 30.0267 22.8712 29.32 23.6136C28.6133 24.3561 27.7289 24.7273 26.6667 24.7273C25.6044 24.7273 24.72 24.3561 24.0133 23.6136C23.3067 22.8712 22.96 21.9545 22.96 20.8636V20H22.6667Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap font-medium leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        {/* Sender Info with Date */}
        <div className="flex items-center justify-between mt-6 pt-4 border-gray-100">
          <div
            className="text-xs font-medium px-3 py-1 rounded-full"
            style={{
              background: `${categoryData.secondaryColor}20`,
              border: `1px solid ${categoryData.secondaryColor}40`,
              color: categoryData.secondaryColor,
              filter: "brightness(0.6)",
            }}
          >
            {formatDate(createdAt)}
          </div>

          <div className="flex items-center">
            <div className="text-right mr-3">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
                Recognized by
              </p>
              <p
                className="text-sm font-semibold"
                style={{
                  color: categoryData.secondaryColor,
                  filter: "brightness(0.6)",
                }}
              >
                {createdBy}
              </p>
            </div>
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 10,
              }}
              transition={{ duration: 0.2 }}
            >
              <Avatar
                src={senderImage}
                alt={createdBy}
                initials={getInitials(createdBy)}
                size="sm"
                className="relative z-10 ring-2 ring-white"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default KudosCard;
