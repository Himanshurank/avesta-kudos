import React, { useState } from "react";
import Head from "next/head";
import { ArrowPathIcon, UserGroupIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import DashboardLayout from "@/components/templates/DashboardLayout";
import { useAuthContext } from "@/components/contexts/AuthContext";

const FeatureItem = ({ text }: { text: string }) => (
  <li className="flex items-center space-x-2 py-1.5">
    <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
    <span className="text-gray-700">{text}</span>
  </li>
);

const ManageTeamsPage = () => {
  const { user, loading } = useAuthContext();
  const [activeTab, setActiveTab] = useState("manage-teams");

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Manage Teams - Coming Soon | Avesta Kudos</title>
      </Head>
      <DashboardLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
      >
        <div className="h-full flex flex-col items-center justify-center py-12 px-4">
          <div className="max-w-4xl w-full mx-auto">
            <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Left illustration column */}
              <div className="md:w-2/5 bg-gradient-to-br from-blue-600 via-indigo-600 via-blue-500 to-cyan-500 p-8 flex items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSI+PC9yZWN0PjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSI+PC9yZWN0Pjwvc3ZnPg==')]"></div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <h2 className="text-2xl font-bold mb-12 tracking-tight text-center">Avesta Teams</h2>
                  
                  <div className="flex items-center justify-center w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full shadow-inner mb-12">
                    <UserGroupIcon className="h-14 w-14 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-center">Team Management</h3>
                  <p className="text-white/80 text-center">Organize and manage your teams</p>
                  
                  <div className="mt-8 flex items-center space-x-2 justify-center">
                    <ArrowPathIcon className="h-5 w-5 animate-spin" />
                    <span className="text-sm font-medium">In development</span>
                  </div>
                </div>
              </div>
              
              {/* Right content column */}
              <div className="md:w-3/5 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">Coming Soon</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300"></span>
                  <span className="text-gray-500 text-sm">Est. Q3 2023</span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Team Management Portal</h2>
                <p className="text-gray-600 mb-6">
                  We&apos;re building a powerful team management system to help you organize your teams more effectively. This feature will streamline team creation, member assignment, and performance tracking.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                  <h3 className="font-medium text-gray-800 mb-4">Key Features</h3>
                  <ul className="space-y-1.5">
                    <FeatureItem text="Create and customize team profiles with detailed information" />
                    <FeatureItem text="Assign team members and designate team leaders with specific permissions" />
                    <FeatureItem text="Set and track team-specific kudos goals and milestones" />
                    <FeatureItem text="Access detailed team performance analytics and reports" />
                    <FeatureItem text="Manage team permissions and visibility settings" />
                  </ul>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Want to be notified when this feature launches? Contact your administrator.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default ManageTeamsPage; 