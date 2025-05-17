import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import KudosPageTemplate from "@/components/templates/KudosPageTemplate";
import { TeamValue, CategoryValue } from "@/shared/enums";
import { kudosServices, createKudosServices } from "@/core/shared/di/kudos";
import { Kudos } from "@/core/domain/entities/Kudos";
import { PaginatedResult } from "@/core/domain/interfaces/IKudosRepository";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

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
    console.log(initialKudosData, "initialKudosData==========================");

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
const teams = [
  "All Teams",
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Customer Success",
];
const categories = [
  "All Categories",
  "Teamwork",
  "Innovation",
  "Helping Hand",
  "Leadership",
  "Excellence",
];

// Items per page constant
const ITEMS_PER_PAGE = 10;

// Transform Kudos entity to the format expected by KudosPageTemplate
const transformKudosForDisplay = (kudos: Kudos) => {
  return {
    id: kudos.id.toString(),
    recipientName: kudos.recipients.map((r) => r.name).join(", "),
    teamName: kudos.team.name,
    category: kudos.category.name,
    message: kudos.message,
    createdBy: kudos.createdBy.name,
    createdAt: new Date(kudos.createdAt).toLocaleDateString(),
  };
};

interface KudosPageProps {
  initialKudosData: PaginatedResult<Kudos> | null;
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
  const [kudosData, setKudosData] = useState<PaginatedResult<Kudos> | null>(
    initialKudosData
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
        setKudosData(result);
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

  // Filter kudos based on current filters
  const filteredKudos =
    kudosData?.data.map(transformKudosForDisplay).filter((kudos) => {
      const matchesSearch =
        kudos.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kudos.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        kudos.createdBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTeam =
        teamFilter === "All Teams" || kudos.teamName === teamFilter;
      const matchesCategory =
        categoryFilter === "All Categories" ||
        kudos.category === categoryFilter;

      return matchesSearch && matchesTeam && matchesCategory;
    }) || [];

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
      teamOptions={teams}
      categoryFilter={categoryFilter}
      setCategoryFilter={setCategoryFilter}
      categoryOptions={categories}
      filteredKudos={filteredKudos}
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
