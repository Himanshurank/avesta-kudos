import React, { useState } from "react";
import { motion } from "framer-motion";
import KudosLayout from "@/components/templates/KudosLayout";
import Link from "next/link";

export default function NewKudos() {
  const [formData, setFormData] = useState({
    recipientName: "",
    teamName: "",
    category: "",
    message: "",
  });
  const [activeTab, setActiveTab] = useState("new");
  const [messageCount, setMessageCount] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "message") {
      setMessageCount(value.length);
    }
  };

  const categoryIcons: Record<string, string> = {
    teamwork: "👥",
    innovation: "💡",
    helping_hand: "🤝",
    leadership: "🏆",
    excellence: "⭐",
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

          <form className="p-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label
                htmlFor="recipientName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Recipient Name <span className="text-indigo-600">*</span>
              </label>
              <motion.input
                whileFocus={{
                  scale: 1.01,
                  boxShadow: "0 4px 20px -8px rgba(99, 102, 241, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 500 }}
                type="text"
                id="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30 transition-all duration-200 outline-none"
                placeholder="Who are you recognizing?"
                required
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
                <motion.select
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 4px 20px -8px rgba(99, 102, 241, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 500 }}
                  id="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30 transition-all duration-200 outline-none appearance-none bg-white"
                  required
                >
                  <option value="" disabled>
                    Select a team
                  </option>
                  <option value="engineering">Engineering</option>
                  <option value="design">Design</option>
                  <option value="product">Product</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="customer_success">Customer Success</option>
                </motion.select>
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category <span className="text-indigo-600">*</span>
                </label>
                <motion.select
                  whileFocus={{
                    scale: 1.01,
                    boxShadow: "0 4px 20px -8px rgba(99, 102, 241, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 500 }}
                  id="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-30 transition-all duration-200 outline-none appearance-none bg-white"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {Object.entries(categoryIcons).map(([key, icon]) => (
                    <option key={key} value={key}>
                      {icon}{" "}
                      {key
                        .replace("_", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </motion.select>
              </div>
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
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
              >
                Submit Kudos
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
