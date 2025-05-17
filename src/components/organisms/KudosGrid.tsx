import React from "react";
import { motion } from "framer-motion";
import KudosCard from "@/components/molecules/KudosCard/KudosCard";
import NoKudosFound from "@/components/molecules/NoKudosFound";

interface IKudos {
  id: string;
  recipientName: string;
  teamName: string;
  category: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

interface IProps {
  kudos: IKudos[];
  className?: string;
  testId?: string;
}

const KudosGrid = (props: IProps) => {
  const { kudos, className = "", testId } = props;

  if (kudos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        data-testid={testId ? `${testId}-empty` : "kudos-grid-empty"}
      >
        <NoKudosFound />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      data-testid={testId || "kudos-grid"}
    >
      {kudos.map((kudos, index) => (
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
            createdBy={kudos.createdBy}
            createdAt={kudos.createdAt}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default KudosGrid;
