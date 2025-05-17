import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import KudosForm from "@/components/organisms/KudosForm";
import { TeamValue, CategoryValue } from "@/shared/enums";

interface IFormData {
  recipientName: string;
  teamName: TeamValue;
  category: CategoryValue;
  message: string;
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IFormData) => void;
  initialData: IFormData;
  className?: string;
  testId?: string;
}

const KudosModal = (props: IProps) => {
  const {
    isOpen,
    onClose,
    onSubmit,
    initialData,
    className = "",
    testId,
  } = props;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className={`fixed inset-0 z-50 overflow-y-auto ${className}`}
        data-testid={testId || "kudos-modal"}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0.2 }}
            className="relative inline-block w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl"
          >
            {/* Form */}
            <KudosForm
              initialData={initialData}
              onSubmit={onSubmit}
              onCancel={onClose}
              className="p-0"
            />
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default KudosModal;
