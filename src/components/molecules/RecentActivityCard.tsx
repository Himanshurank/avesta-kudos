import React from "react";

interface Activity {
  id: number;
  text: string;
  time: string;
}

interface RecentActivityCardProps {
  title: string;
  activities: Activity[];
  className?: string;
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  title,
  activities,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="space-y-4">
        {activities.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent activities</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start border-b border-gray-100 pb-3"
            >
              <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 mr-3"></div>
              <div className="flex-1">
                <p className="text-gray-700">{activity.text}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {activities.length > 0 && (
        <div className="mt-4 text-center">
          <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
            View All Activities
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;
