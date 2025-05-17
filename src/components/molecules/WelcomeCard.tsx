import React from "react";

interface WelcomeCardProps {
  userName: string;
  userRole: string;
  className?: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  userName,
  userRole,
  className = "",
}) => {
  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className={`bg-indigo-600 text-white rounded-lg p-6 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-indigo-200">
            Welcome back to your Digital Kudos dashboard
          </p>
          <div className="mt-2">
            <span className="inline-block px-2 py-1 text-xs rounded-full bg-indigo-500">
              {userRole}
            </span>
          </div>
        </div>

        <div className="mt-4 md:mt-0">
          <div className="bg-indigo-500 rounded-lg p-4">
            <p className="text-sm text-indigo-200 mb-1">Today&apos;s Quote</p>
            <p className="text-white font-medium">
              &ldquo;Recognition is the greatest motivator.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
