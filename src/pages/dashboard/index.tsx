import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "@/components/contexts/AuthContext";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/templates/DashboardLayout";
import UserDashboardTemplate from "@/components/templates/UserDashboardTemplate";
import AdminDashboardTemplate from "@/components/templates/AdminDashboardTemplate";
import SuperAdminDashboardTemplate from "@/components/templates/SuperAdminDashboardTemplate";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { createKudosServices } from "@/core/shared/di/kudos";
import { PaginatedResult } from "@/core/domain/interfaces/IKudosRepository";
import { Kudos } from "@/core/domain/entities/Kudos";

const ITEMS_PER_PAGE = 10;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const token = cookies.auth_token;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  try {
    const { req, res } = context;
    const serverKudosServices = createKudosServices(token, { req, res });

    const initialKudosData =
      await serverKudosServices.getAllKudosUseCase.execute({
        page: 1,
        limit: ITEMS_PER_PAGE,
      });

    return {
      props: {
        initialKudosData: JSON.parse(JSON.stringify(initialKudosData)),
      },
    };
  } catch (error) {
    console.error("Error fetching kudos on server:", error);

    if (
      error instanceof Error &&
      (error.message.includes("Authentication required") ||
        error.message.includes("UNAUTHORIZED"))
    ) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }

    return {
      props: {
        initialKudosData: null,
      },
    };
  }
};
const Dashboard = ({
  initialKudosData,
}: {
  initialKudosData: PaginatedResult<Kudos> | null;
}) => {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      toast.error("Please login to access the dashboard");
      router.push("/auth/login");
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

  const renderRoleDashboard = () => {
    // Check if user has SUPER_ADMIN role
    if (user.roles && user.roles.some((role) => role.name === "SUPER_ADMIN")) {
      return <SuperAdminDashboardTemplate user={user} />;
    }
    // Check if user has ADMIN role
    else if (user.roles && user.roles.some((role) => role.name === "ADMIN")) {
      return <AdminDashboardTemplate user={user} />;
    }
    // Default to User dashboard
    else {
      return (
        <UserDashboardTemplate
          user={user}
          initialKudosData={initialKudosData}
        />
      );
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      user={user}
    >
      {renderRoleDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
