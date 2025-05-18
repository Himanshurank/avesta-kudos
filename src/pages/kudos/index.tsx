import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import KudosPageTemplate from "@/components/templates/KudosPageTemplate";
import { TeamValue, CategoryValue } from "@/shared/enums";
import { kudosServices, createKudosServices } from "@/core/shared/di/kudos";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

// Redefine the API response type to match the actual structure
interface GetAllKudosApiResponse {
  kudos: KudosItem[];
  categories: Array<{ id: number; name: string; description: string }>;
  teams: Array<{ id: number; name: string; description: string }>;
}

// Fix the PaginatedResult usage
interface ApiResponseFormat {
  data: GetAllKudosApiResponse;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

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

// Items per page constant
const ITEMS_PER_PAGE = 10;

// Define a proper type for the kudos item structure
interface KudosItem {
  id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: number;
    name: string;
  };
  recipients: Array<{
    id: number;
    name: string;
  }>;
  team: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
}

// Transform Kudos entity to the format expected by KudosPageTemplate
const transformKudosForDisplay = (kudos: KudosItem) => {
  // Check if recipients is an array, and if not, handle it gracefully
  let recipientNames = "Unknown";

  if (Array.isArray(kudos.recipients)) {
    recipientNames = kudos.recipients.map((r) => r.name).join(", ");
  } else if (
    typeof kudos.recipients === "object" &&
    kudos.recipients !== null
  ) {
    // Handle the case where recipients might be a single object
    const singleRecipient = kudos.recipients as unknown as { name?: string };
    recipientNames = singleRecipient.name || "Unknown";
  }

  return {
    id: kudos.id.toString(),
    recipientName: recipientNames,
    teamName: kudos.team?.name || "Unknown Team",
    category: kudos.category?.name || "Unknown Category",
    message: kudos.message || "",
    createdBy: kudos.createdBy?.name || "Unknown",
    createdAt: kudos.createdAt
      ? new Date(kudos.createdAt).toLocaleDateString()
      : "Unknown date",
  };
};

interface KudosPageProps {
  initialKudosData: ApiResponseFormat | null;
}

export default function KudosPage({ initialKudosData }: KudosPageProps) {
  const router = useRouter();

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [teamFilter, setTeamFilter] = useState("All Teams");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [activeTab, setActiveTab] = useState("kudos");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    recipientName: "",
    teamName: "" as TeamValue,
    category: "" as CategoryValue,
    message: "",
  });
  const [kudosData, setKudosData] = useState<ApiResponseFormat | null>(
    initialKudosData || null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Track current page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch kudos from the API when page changes after initial load
  useEffect(() => {
    // Skip the initial fetch since we already have data from SSR
    if (currentPage === 1 && initialKudosData) return;

    async function fetchKudos() {
      setIsLoading(true);
      try {
        const result = await kudosServices.getAllKudosUseCase.execute({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        });
        setKudosData(result as unknown as ApiResponseFormat);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred fetching kudos";
        console.error("Error fetching kudos:", err);

        // Handle authentication error
        if (
          errorMessage.includes("Authentication required") ||
          errorMessage.includes("UNAUTHORIZED")
        ) {
          router.push("/auth/login");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchKudos();
  }, [currentPage, router, initialKudosData]);

  // Add a useEffect to respond to filter changes
  useEffect(() => {
    // Skip on initial render when kudosData is already loaded from SSR
    if (!kudosData && initialKudosData) return;

    const fetchFilteredKudos = async () => {
      setIsLoading(true);
      try {
        // Prepare parameters for the API call
        const params: {
          page: number;
          limit: number;
          team?: string;
          category?: string;
          search?: string;
        } = {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        };

        // Add filter parameters if they're set
        if (teamFilter !== "All Teams") params.team = teamFilter;
        if (categoryFilter !== "All Categories")
          params.category = categoryFilter;
        if (searchTerm) params.search = searchTerm;

        const result = await kudosServices.getAllKudosUseCase.execute(params);

        // Cast the result to the expected type
        setKudosData(result as unknown as ApiResponseFormat);
      } catch (err) {
        console.error("Error fetching filtered kudos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Use debounce to prevent too many API calls when typing in search
    const timeoutId = setTimeout(() => {
      fetchFilteredKudos();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [teamFilter, categoryFilter, searchTerm, currentPage]);

  // Form submission handler
  const handleFormSubmit = (data: typeof formData) => {
    console.log("Form submitted:", data);
    // Reset form and close modal
    setFormData({
      recipientName: "",
      teamName: "" as TeamValue,
      category: "" as CategoryValue,
      message: "",
    });
    setIsModalOpen(false);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Loading state is shown inside the KudosPageTemplate component
  return (
    <KudosPageTemplate
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      teamFilter={teamFilter}
      setTeamFilter={setTeamFilter}
      teamOptions={kudosData?.data.teams.map((t) => t.name) || []}
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
      categoryOptions={kudosData?.data.categories.map((c) => c.name) || []}
      filteredKudos={kudosData?.data.kudos.map(transformKudosForDisplay) || []}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      formData={formData}
      onFormSubmit={handleFormSubmit}
      pagination={kudosData?.pagination}
      onPageChange={handlePageChange}
      isLoading={isLoading}
    />
  );
}
