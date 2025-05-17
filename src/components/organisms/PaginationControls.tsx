import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface PaginationControlsProps {
  pagination: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  totalFiltered: number;
  className?: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  pagination,
  onPageChange,
  totalFiltered,
  className = "",
}) => {
  const renderPageButtons = () => {
    return Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
      .filter(
        (page) =>
          page === 1 ||
          page === pagination.totalPages ||
          Math.abs(page - pagination.currentPage) <= 1
      )
      .map((page, index, array) => {
        // If there's a gap, show ellipsis
        if (index > 0 && page - array[index - 1] > 1) {
          return (
            <span key={`ellipsis-${page}`} className="px-3 py-2">
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-lg ${
              pagination.currentPage === page
                ? "bg-indigo-600 text-white"
                : "bg-white border border-slate-200 text-black hover:bg-slate-50"
            }`}
            data-testid={`page-button-${page}`}
          >
            {page}
          </button>
        );
      });
  };

  return (
    <div
      className={`p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 ${className}`}
    >
      <div className="text-slate-600 font-medium">
        Showing {totalFiltered} of {pagination.totalItems} users
      </div>
      <div className="flex items-center space-x-2">
        <button
          disabled={pagination.currentPage <= 1}
          onClick={() => onPageChange(pagination.currentPage - 1)}
          className={`flex items-center px-3 py-2 ${
            pagination.currentPage <= 1
              ? "bg-white border border-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-white border border-slate-200 text-black rounded-lg cursor-pointer hover:bg-slate-50"
          }`}
          data-testid="previous-page-button"
        >
          <ChevronLeftIcon className="w-4 h-4 mr-1" />
          Previous
        </button>

        {renderPageButtons()}

        <button
          disabled={pagination.currentPage >= pagination.totalPages}
          onClick={() => onPageChange(pagination.currentPage + 1)}
          className={`flex items-center px-3 py-2 ${
            pagination.currentPage >= pagination.totalPages
              ? "bg-white border border-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-white border border-slate-200 text-black rounded-lg cursor-pointer hover:bg-slate-50"
          }`}
          data-testid="next-page-button"
        >
          Next
          <ChevronRightIcon className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
