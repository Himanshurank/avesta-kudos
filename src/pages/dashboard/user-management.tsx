import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/core/application/context/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { motion } from "framer-motion";

const UserManagementPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("user-management");
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      createdAt: "2023-01-15",
    },
    {
      id: 2,
      name: "Sarah Jones",
      email: "sarah@example.com",
      role: "User",
      status: "Active",
      createdAt: "2023-02-20",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike@example.com",
      role: "User",
      status: "Active",
      createdAt: "2023-03-10",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@example.com",
      role: "Admin",
      status: "Active",
      createdAt: "2023-04-05",
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
            <h1 className="text-2xl font-bold text-gray-800">
              User Management
            </h1>
            <button
              onClick={() =>
                toast.success(
                  "This would open a create user modal in the full app"
                )
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add New User
            </button>
          </div>

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
                    Role
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Created
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-800">{user.name}</td>
                    <td className="py-3 px-4 text-gray-800">{user.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "Admin"
                            ? "bg-indigo-100 text-indigo-800"
                            : user.role === "Super Admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {user.createdAt}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            toast.success(`Edit user: ${user.name}`)
                          }
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            toast.success(`Manage roles for: ${user.name}`)
                          }
                          className="text-green-600 hover:text-green-900"
                        >
                          Roles
                        </button>
                        <button
                          onClick={() => {
                            toast.success(`User deleted: ${user.name}`);
                            setUsers(users.filter((u) => u.id !== user.id));
                          }}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-gray-600">Showing 4 of 4 users</div>
            <div className="flex space-x-2">
              <button
                disabled
                className="px-3 py-1 bg-gray-200 text-gray-400 rounded cursor-not-allowed"
              >
                Previous
              </button>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">
                1
              </button>
              <button
                disabled
                className="px-3 py-1 bg-gray-200 text-gray-400 rounded cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default UserManagementPage;
