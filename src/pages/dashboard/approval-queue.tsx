import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/core/application/context/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { motion } from "framer-motion";

const ApprovalQueuePage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("approval-queue");
  const [pendingUsers, setPendingUsers] = useState([
    {
      id: 5,
      name: "Alex Johnson",
      email: "alex@example.com",
      requestedRole: "User",
      department: "Marketing",
      registeredAt: "2023-06-12 09:45 AM",
    },
    {
      id: 6,
      name: "Jessica Williams",
      email: "jessica@example.com",
      requestedRole: "Admin",
      department: "Engineering",
      registeredAt: "2023-06-13 02:30 PM",
    },
    {
      id: 7,
      name: "Robert Brown",
      email: "robert@example.com",
      requestedRole: "User",
      department: "Sales",
      registeredAt: "2023-06-14 11:15 AM",
    },
  ]);

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      toast.error("Please login to access the dashboard");
      router.push("/auth/login");
      return;
    }

    // If user is not a super admin, redirect to dashboard
    if (!loading && user && !user.isSuperAdmin()) {
      toast.error("You don't have permission to access this page");
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // If still loading or no user, show loading screen
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  const handleApprove = (userId: number) => {
    toast.success(`User approved: ID ${userId}`);
    // In a real app, this would call an API to update the user status
    setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
  };

  const handleReject = (userId: number) => {
    toast.success(`User rejected: ID ${userId}`);
    // In a real app, this would call an API to update the user status
    setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      user={user}
    >
      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Approval Queue
              </h1>
              <p className="text-gray-600 mt-1">
                Manage pending user registration requests
              </p>
            </div>
            <div className="bg-yellow-100 px-4 py-2 rounded-md">
              <span className="text-yellow-800 font-medium">
                {pendingUsers.length} Pending Requests
              </span>
            </div>
          </div>

          {pendingUsers.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                All caught up!
              </h3>
              <p className="text-gray-600">
                There are no pending user registrations to review.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                      Email
                    </th>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                      Requested Role
                    </th>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                      Department
                    </th>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                      Registered
                    </th>
                    <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pendingUsers.map((pendingUser) => (
                    <tr key={pendingUser.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">
                        {pendingUser.name}
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {pendingUser.email}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            pendingUser.requestedRole === "Admin"
                              ? "bg-indigo-100 text-indigo-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {pendingUser.requestedRole}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {pendingUser.department}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {pendingUser.registeredAt}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(pendingUser.id)}
                            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(pendingUser.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ApprovalQueuePage;
