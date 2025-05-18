import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import KudosLayout from "@/components/templates/KudosLayout";
import Link from "next/link";
import { container } from "@/core/shared/di/container";
import { User } from "@/core/domain/entities/User";
import toast from "react-hot-toast";
import CustomDropdown, {
  DropdownOption,
} from "@/components/molecules/CustomDropdown";
import { TeamValue, CategoryValue, CATEGORY_LABELS } from "@/shared/enums";
import Router from "next/router";
import { kudosServices } from "@/core/shared/di/kudos";

// Simulated map of user IDs to teams (for demo purposes)
const userTeamMap: Record<string, TeamValue> = {};

export default function NewKudos() {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientId: "",
    teamName: "" as TeamValue,
    category: "" as CategoryValue,
    message: "",
  });
  const [activeTab, setActiveTab] = useState("new");
  const [messageCount, setMessageCount] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [teamDisabled, setTeamDisabled] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await container.getAllUsersUseCase.execute({
          page: 1,
          limit: 100,
          approvalStatus: "Approved",
        });
        setUsers(response.users);

        // Simulate assigning a random team to each user
        response.users.forEach((user) => {
          const teams = Object.values(TeamValue);
          const randomTeam = teams[Math.floor(Math.random() * teams.length)];
          userTeamMap[user.id.toString()] = randomTeam;
        });
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;

    if (id === "recipientId") {
      const selectedUser = users.find((user) => user.id.toString() === value);
      setFormData((prev) => ({
        ...prev,
        recipientId: value,
        recipientName: selectedUser ? selectedUser.name : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }

    if (id === "message") {
      setMessageCount(value.length);
    }
  };

  // Transform users into dropdown options
  const userOptions: DropdownOption[] = users.map((user) => ({
    value: user.id.toString(),
    label: user.name,
  }));

  // Create category options from CategoryValue enum
  const categoryOptions: DropdownOption<CategoryValue>[] = Object.values(
    CategoryValue
  ).map((value) => ({
    value,
    label: CATEGORY_LABELS[value],
    icon: CATEGORY_LABELS[value].split(" ")[0],
  }));

  // Handle dropdown changes
  const handleRecipientChange = (value: string) => {
    const selectedUser = users.find((user) => user.id.toString() === value);

    // Auto-select team based on the selected user
    const userTeam = userTeamMap[value] || "";

    setFormData((prev) => ({
      ...prev,
      recipientId: value,
      recipientName: selectedUser ? selectedUser.name : "",
      teamName: userTeam,
    }));

    // Indicate that a recipient is selected
    setTeamDisabled(!!value);

    // Show toast indicating the team was auto-selected
    if (userTeam) {
      toast.success(`Team ${selectedUser?.team.name} automatically selected`);
    }
  };

  const handleCategoryChange = (value: CategoryValue) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  // Custom renderer for category options with emojis
  const renderCategoryOption = (
    option: DropdownOption<CategoryValue>,
    isSelected: boolean
  ) => (
    <div
      className={`px-4 py-2.5 cursor-pointer hover:bg-indigo-50 flex items-center ${
        isSelected ? "bg-indigo-100 text-indigo-800" : "text-gray-700"
      }`}
    >
      <span className="mr-2 text-lg">{option.icon}</span>
      <span>{option.label.replace(/^[^ ]+ /, "")}</span>
    </div>
  );

  // Add a wrapper function to convert string ID to User object
  const handleSetSelectedUser = (userId: string) => {
    const user = users.find((u) => u.id.toString() === userId) || null;
    setSelectedUser(user);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.recipientId ||
      !formData.category ||
      !formData.message.trim()
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);

      // Create the kudos object in the format expected by the repository
      const kudosData = {
        message: formData.message.trim(),
        recipients: [
          { id: parseInt(formData.recipientId), name: formData.recipientName },
        ],
        team: {
          id: Object.values(TeamValue).indexOf(formData.teamName) + 1,
          name: formData.teamName,
        },
        category: {
          id: Object.values(CategoryValue).indexOf(formData.category) + 1,
          name: formData.category,
        },
        createdBy: {
          id: 0, // Will be set by the backend based on the authenticated user
          name: "", // Will be set by the backend
        },
      };

      // Use the kudos repository directly from kudosServices
      await kudosServices.kudosRepository.create(kudosData);

      toast.success("Kudos submitted successfully!");

      // Redirect to the kudos list page
      Router.push("/kudos");
    } catch (error) {
      console.error("Error submitting kudos:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit kudos"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KudosLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16">
              <div className="absolute w-full h-full rounded-full bg-white opacity-10"></div>
            </div>
            <div className="relative">
              <h1 className="text-3xl font-bold">Give Kudos</h1>
              <p className="text-indigo-100 mt-2 text-lg">
                Recognize someone&apos;s great work and spread positivity
              </p>
            </div>
          </div>

          <form className="p-8 space-y-8" onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CustomDropdown
                id="recipientId"
                name="recipientId"
                label="Recipient"
                value={formData.recipientId}
                options={userOptions}
                onChange={handleRecipientChange}
                setSelectedValue={handleSetSelectedUser}
                placeholder={
                  loading ? "Loading users..." : "Select a recipient"
                }
                required
                testId="recipient-dropdown"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div>
                <label
                  htmlFor="teamName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Team <span className="text-indigo-600">*</span>
                </label>
                <motion.input
                  id="teamName"
                  name="teamName"
                  type="text"
                  value={selectedUser?.team?.name || ""}
                  className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30 transition-all duration-200 outline-none ${
                    teamDisabled ? "bg-gray-50" : ""
                  }`}
                  disabled={true}
                  readOnly
                />
                {formData.recipientId && (
                  <div className="mt-2 text-xs text-indigo-600 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      Team is automatically selected based on recipient
                    </span>
                  </div>
                )}
              </div>

              <CustomDropdown
                id="category"
                name="category"
                label="Category"
                value={formData.category}
                options={categoryOptions}
                onChange={handleCategoryChange}
                placeholder="Select a category"
                required
                renderOption={renderCategoryOption}
                testId="category-dropdown"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message <span className="text-indigo-600">*</span>
              </label>
              <div className="relative">
                <motion.textarea
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 4px 20px -8px rgba(99, 102, 241, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 500 }}
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30 transition-all duration-200 outline-none"
                  placeholder="Why does this person deserve recognition? Be specific about their actions and the impact."
                  required
                  maxLength={500}
                />
                <div
                  className={`absolute bottom-3 right-3 text-xs px-2 py-1 rounded-full ${
                    messageCount > 400
                      ? "bg-amber-100 text-amber-800"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {messageCount}/500
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="border-t border-gray-100 pt-8 flex justify-end space-x-4"
            >
              <Link href="/">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
              </Link>
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                disabled={submitting}
                className={`px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all ${
                  submitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {submitting ? "Submitting..." : "Submit Kudos"}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 bg-indigo-50 border border-indigo-100 rounded-xl p-6 text-indigo-800"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-600"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">
                Tips for writing great kudos
              </h3>
              <div className="text-indigo-700 space-y-2">
                <p className="mb-2">
                  Great recognition is specific, timely, and highlights impact:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Be specific about what they did and how they did it</li>
                  <li>
                    Highlight the impact of their actions on the team or company
                  </li>
                  <li>
                    Connect their contribution to company values when relevant
                  </li>
                  <li>Keep your message genuine and personal</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </KudosLayout>
  );
}
