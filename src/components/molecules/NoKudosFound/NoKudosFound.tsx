import React from 'react';

interface NoKudosFoundProps {
  message?: string;
  className?: string;
}

const NoKudosFound: React.FC<NoKudosFoundProps> = ({
  message = 'Try adjusting your search or filter criteria',
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 ${className}`}>
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-indigo-100 rounded-full blur-md opacity-70"></div>
        <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform transition-transform duration-300 hover:scale-110"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No kudos found</h3>
      <p className="text-base text-gray-500 max-w-md text-center">
        {message}
      </p>
      <div className="mt-8 w-48 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent rounded-full"></div>
    </div>
  );
};

export default NoKudosFound; 