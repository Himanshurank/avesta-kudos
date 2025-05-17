import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import KudosCard from '@/components/molecules/KudosCard/KudosCard';
import NoKudosFound from '@/components/molecules/NoKudosFound';
import KudosLayout from '@/components/templates/KudosLayout';
import { TeamValue, CategoryValue } from '@/shared/enums';
import KudosForm from '@/components/organisms/KudosForm/KudosForm';

// Mock data for demonstration
const mockKudos = [
    {
        id: '1',
        recipientName: 'Sarah Johnson',
        teamName: 'Engineering',
        category: 'Teamwork',
        message: 'Sarah went above and beyond to help our team complete the project ahead of schedule. Her collaborative spirit made all the difference!',
        createdBy: 'Michael Chen',
        createdAt: '2 days ago',
    },
    {
        id: '2',
        recipientName: 'David Rodriguez',
        teamName: 'Design',
        category: 'Innovation',
        message: 'David\'s creative solution to our UX challenge completely transformed the user experience. His innovative thinking is truly inspiring.',
        createdBy: 'Priya Patel',
        createdAt: '3 days ago',
    },
    {
        id: '3',
        recipientName: 'Emily Taylor',
        teamName: 'Product',
        category: 'Helping Hand',
        message: 'Emily stepped in to help our team when we were short-staffed. Her willingness to assist others demonstrates true teamwork.',
        createdBy: 'James Wilson',
        createdAt: '1 week ago',
    },
    {
        id: '4',
        recipientName: 'Alex Martinez',
        teamName: 'Engineering',
        category: 'Excellence',
        message: 'Alex\'s attention to detail and commitment to quality resulted in a flawless product launch. His excellence sets a high standard.',
        createdBy: 'Lisa Thompson',
        createdAt: '1 week ago',
    },
    {
        id: '5',
        recipientName: 'Olivia Kim',
        teamName: 'Marketing',
        category: 'Leadership',
        message: 'Olivia expertly guided our team through a challenging campaign. Her leadership skills and strategic thinking were crucial to our success.',
        createdBy: 'Robert Johnson',
        createdAt: '2 weeks ago',
    },
];

// Available filter options
const teams = ['All Teams', 'Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'Customer Success'];
const categories = ['All Categories', 'Teamwork', 'Innovation', 'Helping Hand', 'Leadership', 'Excellence'];

export default function KudosPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [teamFilter, setTeamFilter] = useState('All Teams');
    const [categoryFilter, setCategoryFilter] = useState('All Categories');
    const [activeTab, setActiveTab] = useState('kudos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        recipientName: "",
        teamName: "" as TeamValue,
        category: "" as CategoryValue,
        message: "",
    });
    // Filter kudos based on current filters
    const filteredKudos = mockKudos.filter((kudos) => {
        const matchesSearch =
            kudos.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            kudos.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            kudos.createdBy.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesTeam = teamFilter === 'All Teams' || kudos.teamName === teamFilter;
        const matchesCategory = categoryFilter === 'All Categories' || kudos.category === categoryFilter;

        return matchesSearch && matchesTeam && matchesCategory;
    });

    return (
        <KudosLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {/* Main content */}
            <main className="p-6">
                {/* <div className="flex justify-between items-center mb-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: .0 }}
                        className="text-2xl font-bold text-gray-900"
                    >
                        Kudos Wall
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="mr-2"
                            >
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Give Kudos
                        </button>
                    </motion.div>
                </div> */}

                {/* Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100 bg-gradient-to-br from-white to-gray-50"
                >
                    <div className="flex items-center mb-5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-800">Filter Kudos</h3>
                    </div>

                    {/* Search bar */}
                    <div className="mb-6 transform transition duration-200 hover:scale-[1.01]">
                        <div className="relative">
                            <input
                                type="text"
                                id="search"
                                className="block w-full pl-12 pr-4 py-3.5 border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-gray-900 shadow-sm"
                                placeholder="Search by name, content, or category..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors duration-150"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter controls */}
                    <div className="flex flex-col sm:flex-row gap-5 mb-5">
                        <div className="flex-1 transform transition duration-200 hover:scale-[1.02]">
                            <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                </svg>
                                Team
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <select
                                    id="team"
                                    className="block w-full pl-3 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200 hover:border-indigo-300"
                                    value={teamFilter}
                                    onChange={(e) => setTeamFilter(e.target.value)}
                                >
                                    {teams.map((team) => (
                                        <option key={team} value={team}>
                                            {team}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 transform transition duration-200 hover:scale-[1.02]">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                Category
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <select
                                    id="category"
                                    className="block w-full pl-3 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200 hover:border-indigo-300"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active filters */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                        {(teamFilter !== 'All Teams' || categoryFilter !== 'All Categories' || searchTerm) && (
                            <div className="mr-2 text-sm font-medium text-indigo-600 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                </svg>
                                Active filters:
                            </div>
                        )}

                        {searchTerm && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 shadow-sm transition-all duration-150 hover:bg-indigo-200">
                                Search: {searchTerm}
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="ml-1.5 inline-flex items-center justify-center rounded-full h-4 w-4 text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none"
                                >
                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        )}

                        {teamFilter !== 'All Teams' && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 shadow-sm transition-all duration-150 hover:bg-blue-200">
                                Team: {teamFilter}
                                <button
                                    onClick={() => setTeamFilter('All Teams')}
                                    className="ml-1.5 inline-flex items-center justify-center rounded-full h-4 w-4 text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none"
                                >
                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        )}

                        {categoryFilter !== 'All Categories' && (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-100 text-green-800 shadow-sm transition-all duration-150 hover:bg-green-200">
                                Category: {categoryFilter}
                                <button
                                    onClick={() => setCategoryFilter('All Categories')}
                                    className="ml-1.5 inline-flex items-center justify-center rounded-full h-4 w-4 text-green-400 hover:bg-green-200 hover:text-green-600 focus:outline-none"
                                >
                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </span>
                        )}

                        {(teamFilter !== 'All Teams' || categoryFilter !== 'All Categories' || searchTerm) && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setTeamFilter('All Teams');
                                    setCategoryFilter('All Categories');
                                }}
                                className="ml-auto text-sm text-gray-500 hover:text-indigo-600 hover:underline focus:outline-none transition-colors duration-150 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                                Clear all filters
                            </button>
                        )}
                    </div>
                </motion.div>

                {filteredKudos.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredKudos.map((kudos, index) => (
                            <motion.div
                                key={kudos.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (index + 1) }}
                            >
                                <KudosCard
                                    recipientName={kudos.recipientName}
                                    teamName={kudos.teamName}
                                    category={kudos.category}
                                    message={kudos.message}
                                    createdBy={kudos.createdBy}
                                    createdAt={kudos.createdAt}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <NoKudosFound />
                    </motion.div>
                )}
            </main>

            {/* Floating Give Kudos Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 z-30 p-4 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span className="font-medium">Give Kudos</span>
            </motion.button>

            {/* Kudos Form Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
                                onClick={() => setIsModalOpen(false)}
                            />

                            {/* Modal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ type: "spring", bounce: 0.2 }}
                                className="relative inline-block w-full max-w-3xl overflow-hidden text-left align-middle transition-all transform bg-white rounded-2xl shadow-xl"
                            >

                                {/* Form */}
                                <KudosForm
                                    initialData={formData}
                                    onSubmit={(data) => {
                                        console.log('Form submitted:', data);
                                        // Reset form and close modal
                                        setFormData({
                                            recipientName: "",
                                            teamName: "" as TeamValue,
                                            category: "" as CategoryValue,
                                            message: "",
                                        });
                                        setIsModalOpen(false);
                                    }}
                                    onCancel={() => setIsModalOpen(false)}
                                    className="p-0"
                                />
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </KudosLayout>
    );
}
