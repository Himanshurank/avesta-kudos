// Mock data for the kudos system
const mockKudos = [
  {
    id: "1",
    recipientName: "Sarah Johnson",
    teamName: "Engineering",
    category: "Teamwork",
    message:
      "Thank you for stepping up and helping the team complete the project under a tight deadline. Your willingness to put in extra hours and mentor junior developers made all the difference!",
    createdBy: "Michael Chen",
    createdAt: "2023-06-15T14:35:00Z",
    createdAtFormatted: "2 days ago",
  },
  {
    id: "2",
    recipientName: "David Rodriguez",
    teamName: "Design",
    category: "Innovation",
    message:
      "Your redesign of our onboarding flow has received amazing feedback from users. The thoughtful animations and clear instructions have reduced our drop-off rate by 35%!",
    createdBy: "Emily Williams",
    createdAt: "2023-06-14T09:22:00Z",
    createdAtFormatted: "3 days ago",
  },
  {
    id: "3",
    recipientName: "Alex Patel",
    teamName: "Product",
    category: "Leadership",
    message:
      "Your leadership during our quarterly planning session helped us prioritize the right features. Everyone felt heard and the roadmap is both ambitious and achievable.",
    createdBy: "Jessica Lee",
    createdAt: "2023-06-12T16:45:00Z",
    createdAtFormatted: "5 days ago",
  },
  {
    id: "4",
    recipientName: "Michelle Thompson",
    teamName: "Marketing",
    category: "Helping Hand",
    message:
      "Thank you for taking the time to help me understand the analytics dashboard. Your patience and clear explanations have made me much more confident in using data to drive decisions.",
    createdBy: "Robert Kim",
    createdAt: "2023-06-08T11:15:00Z",
    createdAtFormatted: "1 week ago",
  },
  {
    id: "5",
    recipientName: "James Wilson",
    teamName: "Engineering",
    category: "Excellence",
    message:
      "The refactoring you did on our authentication service is impressive. Code is cleaner, tests are more comprehensive, and performance has improved by 60%. Outstanding work!",
    createdBy: "Sophia Garcia",
    createdAt: "2023-06-07T15:30:00Z",
    createdAtFormatted: "1 week ago",
  },
];

// Mock categories
const categories = [
  {
    id: "1",
    name: "Teamwork",
    description: "Recognizing collaborative efforts",
  },
  {
    id: "2",
    name: "Innovation",
    description: "Recognizing creative solutions",
  },
  {
    id: "3",
    name: "Helping Hand",
    description: "Recognizing support provided to others",
  },
  {
    id: "4",
    name: "Leadership",
    description: "Recognizing guidance and direction",
  },
  {
    id: "5",
    name: "Excellence",
    description: "Recognizing exceptional quality of work",
  },
];

// Mock teams
const teams = [
  { id: "1", name: "Engineering", description: "Software development team" },
  { id: "2", name: "Design", description: "UI/UX design team" },
  { id: "3", name: "Product", description: "Product management team" },
  {
    id: "4",
    name: "Marketing",
    description: "Marketing and communications team",
  },
  {
    id: "5",
    name: "Sales",
    description: "Sales and business development team",
  },
  {
    id: "6",
    name: "Customer Success",
    description: "Customer support and success team",
  },
];

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock API service
export const KudosService = {
  // Get all kudos with optional filtering
  getAllKudos: async (filters?: {
    teamName?: string;
    category?: string;
    recipientName?: string;
    dateFrom?: string;
    dateTo?: string;
    searchTerm?: string;
  }) => {
    await delay(800); // Simulate network delay

    let filteredKudos = [...mockKudos];

    if (filters) {
      if (filters.teamName) {
        filteredKudos = filteredKudos.filter(
          (k) => k.teamName === filters.teamName
        );
      }

      if (filters.category) {
        filteredKudos = filteredKudos.filter(
          (k) => k.category === filters.category
        );
      }

      if (filters.recipientName) {
        filteredKudos = filteredKudos.filter((k) =>
          k.recipientName
            .toLowerCase()
            .includes(filters.recipientName!.toLowerCase())
        );
      }

      if (filters.searchTerm) {
        const searchTermLower = filters.searchTerm.toLowerCase();
        filteredKudos = filteredKudos.filter(
          (k) =>
            k.message.toLowerCase().includes(searchTermLower) ||
            k.recipientName.toLowerCase().includes(searchTermLower) ||
            k.teamName.toLowerCase().includes(searchTermLower)
        );
      }

      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        filteredKudos = filteredKudos.filter(
          (k) => new Date(k.createdAt) >= fromDate
        );
      }

      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        filteredKudos = filteredKudos.filter(
          (k) => new Date(k.createdAt) <= toDate
        );
      }
    }

    return {
      success: true,
      data: filteredKudos,
      pagination: {
        page: 1,
        limit: 10,
        total: filteredKudos.length,
        pages: Math.ceil(filteredKudos.length / 10),
      },
    };
  },

  // Get a single kudos by ID
  getKudosById: async (id: string) => {
    await delay(500);
    const kudos = mockKudos.find((k) => k.id === id);

    if (!kudos) {
      return {
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "Kudos not found",
        },
      };
    }

    return {
      success: true,
      data: kudos,
    };
  },

  // Create a new kudos
  createKudos: async (kudosData: {
    recipientName: string;
    teamName: string;
    category: string;
    message: string;
  }) => {
    await delay(1000);

    // Simulate validation
    if (
      !kudosData.recipientName ||
      !kudosData.teamName ||
      !kudosData.category ||
      !kudosData.message
    ) {
      return {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "All fields are required",
        },
      };
    }

    // Create a new kudos with mock data
    const newKudos = {
      id: `${mockKudos.length + 1}`,
      ...kudosData,
      createdBy: "Current User", // In a real app, this would come from the authenticated user
      createdAt: new Date().toISOString(),
      createdAtFormatted: "Just now",
    };

    // In a real app, this would be added to a database
    // For this mock, we're not actually modifying the array to keep it simple

    return {
      success: true,
      data: newKudos,
    };
  },

  // Get all categories
  getCategories: async () => {
    await delay(300);
    return {
      success: true,
      data: categories,
    };
  },

  // Get all teams
  getTeams: async () => {
    await delay(300);
    return {
      success: true,
      data: teams,
    };
  },
};

export default KudosService;
