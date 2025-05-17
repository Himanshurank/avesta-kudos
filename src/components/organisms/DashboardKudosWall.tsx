import React, { useState } from "react";
import { motion } from "framer-motion"; // Adding motion for micro-interactions

interface KudosFilters {
  team: string;
  category: string;
  searchTerm: string;
}

interface KudosCardData {
  id: number;
  team: string;
  recipient: string;
  message: string;
  category: string;
  categoryIcon: string;
  sender: string;
  createdAt: string;
}

interface DashboardKudosWallProps {
  kudosData: KudosCardData[];
  className?: string;
}

const DashboardKudosWall = ({
  kudosData = [],
  className = "",
}: DashboardKudosWallProps) => {
  const [filters, setFilters] = useState<KudosFilters>({
    team: "",
    category: "",
    searchTerm: "",
  });

  // Handle filter changes
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      team: "",
      category: "",
      searchTerm: "",
    });
  };

  // Get team-specific sample data or filtered data in a real application
  const getTeamData = (teamName: string) => {
    // Filter kudosData by team
    return kudosData.filter(kudos => kudos.team.toLowerCase() === teamName.toLowerCase());
  };

  // Apply team-specific styling
  const getTeamStyle = (team: string) => {
    const styles = {
      Engineering: {
        accentColor: "#4F46E5", // indigo
        bgGradient: "from-indigo-500 to-indigo-600",
        lightBg: "#EEF2FF",
        icon: "🛠️",
        pattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      },
      Design: {
        accentColor: "#EC4899", // pink
        bgGradient: "from-pink-500 to-pink-600",
        lightBg: "#FDF2F8",
        icon: "🎨",
        pattern: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23EC4899' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
      },
      Product: {
        accentColor: "#8B5CF6", // purple
        bgGradient: "from-purple-500 to-purple-600",
        lightBg: "#F5F3FF",
        icon: "📊",
        pattern: `url("data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm28 8h12v6H28V8zm14-8h12v6H42V0zm14 0h12v6H56V0zm0 8h12v6H56V8zM42 8h12v6H42V8zm0 16h12v6H42v-6zm14-8h12v6H56v-6zm14 0h12v6H70v-6zm0-16h12v6H70V0zM28 32h12v6H28v-6zM14 16h12v6H14v-6zM0 24h12v6H0v-6zm0 8h12v6H0v-6zm14 0h12v6H14v-6zm14 8h12v6H28v-6zm-14 0h12v6H14v-6zm28 0h12v6H42v-6zm14-8h12v6H56v-6zm0-8h12v6H56v-6zm14 8h12v6H70v-6zm0 8h12v6H70v-6zM14 24h12v6H14v-6zm14-8h12v6H28v-6zM14 8h12v6H14V8zM0 8h12v6H0V8z' fill='%238B5CF6' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`
      }
    };
    
    return styles[team as keyof typeof styles] || styles.Engineering;
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    const colors = {
      "Teamwork": {
        bgColor: "#4B4DB2",
        textColor: "#FFFFFF",
        headerText: "GREAT TEAMWORK!",
        icon: "👥"
      },
      "Excellence": {
        bgColor: "#26BBA9",
        textColor: "#FFFFFF",
        headerText: "TOTALLY AWESOME!",
        icon: "⭐"
      },
      "Innovation": {
        bgColor: "#E85C41",
        textColor: "#FFFFFF",
        headerText: "CONGRATULATIONS!",
        icon: "💡"
      },
      "Leadership": {
        bgColor: "#9C2DA3",
        textColor: "#FFFFFF",
        headerText: "PROUD!",
        icon: "🏆"
      },
      "Helping Hand": {
        bgColor: "#D23B68",
        textColor: "#FFFFFF",
        headerText: "THANK YOU!",
        icon: "👍"
      },
      "Customer Focus": {
        bgColor: "#2563EB", // blue
        textColor: "#FFFFFF",
        headerText: "CUSTOMER CHAMPION!",
        icon: "💼"
      },
      "Quick Learner": {
        bgColor: "#059669", // emerald
        textColor: "#FFFFFF",
        headerText: "FAST LEARNER!",
        icon: "🧠"
      },
      "Above and Beyond": {
        bgColor: "#7C3AED", // violet
        textColor: "#FFFFFF",
        headerText: "EXCEPTIONAL!",
        icon: "🚀"
      }
    };
    
    return colors[category as keyof typeof colors] || {
      bgColor: "#F97316", // orange fallback
      textColor: "#FFFFFF",
      headerText: "WELL DONE!",
      icon: "👏"
    };
  };

  const renderFilterSection = () => (
    <div className="mb-6 p-0">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative"
      >
        <div className="flex items-center">
          <div className="bg-indigo-100 p-1.5 rounded-lg mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-800">Filter Kudos</h3>
            <p className="text-xs text-gray-500">Find exactly what you're looking for</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-grow">
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
            <select
              name="team"
              value={filters.team}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:border-indigo-300"
              aria-label="Filter by team"
            >
              <option value="">All Teams</option>
              <option value="engineering">💻 Engineering</option>
              <option value="design">🎨 Design</option>
              <option value="product">📊 Product</option>
              <option value="marketing">📣 Marketing</option>
            </select>
          </motion.div>
          
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }}>
            <select
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:border-indigo-300"
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              <option value="teamwork">👥 Teamwork</option>
              <option value="innovation">💡 Innovation</option>
              <option value="helping_hand">👍 Helping Hand</option>
              <option value="leadership">🏆 Leadership</option>
              <option value="customer_focus">💼 Customer Focus</option>
              <option value="quick_learner">🧠 Quick Learner</option>
              <option value="above_and_beyond">🚀 Above and Beyond</option>
            </select>
          </motion.div>
          
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400 }} className="relative">
            <input
              type="text"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Search kudos..."
              className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm hover:border-indigo-300"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.div>
        </div>
        
        <div className="flex gap-2 shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResetFilters}
            className="px-3 py-2 bg-white text-gray-600 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-all shadow-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Apply
          </motion.button>
        </div>
      </motion.div>
    </div>
  );

  // Vertically split team kudos sections
  const renderTeamKudos = (teamName: string) => {
    const teamData = getTeamData(teamName);
    const style = getTeamStyle(teamName);
    
    return (
      <div className="relative">
        <div 
          className="flex flex-col rounded-xl shadow-md h-full overflow-hidden"
          style={{ backgroundColor: style.lightBg }}
        >
          {teamData.map((kudos) => {
            const categoryStyle = getCategoryColor(kudos.category);
            
            // Simulate multiple categories for demonstration
            const categories = [
              kudos.category,
              kudos.category === "Teamwork" ? "Leadership" : "Teamwork",
              kudos.category === "Excellence" ? "Innovation" : "Excellence"
            ];
            
            return (
            <div key={kudos.id} className="flex-grow flex flex-col">
              <motion.div
                whileHover={{ 
                  y: -3, 
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ duration: 0.2 }}
                className="flex flex-col w-full bg-white rounded-xl h-64"
                style={{ 
                  backgroundImage: style.pattern,
                  backgroundColor: style.lightBg,
                }}
                aria-label={`Kudos to ${kudos.recipient} from ${teamName} team`}
              >
                {/* Card content */}
                <div className="p-3 flex-grow flex flex-col" style={{ backdropFilter: "blur(2px)" }}>
                  <div className="flex items-center mb-1.5">
                    <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center mr-2 text-base shadow-sm">
                      {categoryStyle.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base">To: {kudos.recipient}</h4>
                      <p className="text-xs text-gray-500">{kudos.createdAt}</p>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-center py-1">
                    <div className="relative mx-2">
                      <div className="absolute -left-1 top-0 text-gray-200 text-xl opacity-60">
                        &ldquo;
                      </div>
                      <p className="text-gray-800 text-sm mx-3 italic leading-snug overflow-hidden" 
                         style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {kudos.message}
                      </p>
                      <div className="absolute -right-1 bottom-0 text-gray-200 text-xl opacity-60">
                        &rdquo;
                      </div>
                    </div>
                  </div>

                  {/* Category tags above the From section */}
                  <div className="mt-1 mb-1 flex flex-wrap gap-1">
                    {categories.map((category, index) => {
                      const catStyle = getCategoryColor(category);
                      return (
                        <span 
                          key={index}
                          className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium shadow-sm bg-white" 
                          style={{ color: catStyle.bgColor }}
                        >
                          {category}
                        </span>
                      );
                    })}
                  </div>

                  {/* From section - more prominent with color matching the image */}
                  <div className="bg-white bg-opacity-80 px-3 py-1.5 border-t border-gray-200 backdrop-blur-sm">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="block text-xs uppercase font-bold text-gray-500 tracking-wide">From</span>
                        <span className="text-sm font-bold" style={{ color: style.accentColor }}>
                          {kudos.sender}
                        </span>
                      </div>
                      <span 
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shadow-sm bg-white" 
                        style={{ color: style.accentColor }}
                      >
                        {teamName}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )})}
        </div>
      </div>
    );
  };

  const renderPagination = () => (
    <div className="mt-8 flex justify-center">
      <motion.nav 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center space-x-2 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100"
      >
        <motion.button 
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center font-medium text-gray-600 transition-all"
          aria-label="Go to previous page"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </motion.button>
        
        <div className="flex items-center space-x-1.5 mx-1">
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-medium shadow-md"
            aria-label="Page 1"
            aria-current="page"
          >
            1
          </motion.button>
          
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-indigo-50 text-gray-700 font-medium transition-colors"
            aria-label="Page 2"
          >
            2
          </motion.button>
          
          <motion.button 
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-indigo-50 text-gray-700 font-medium transition-colors"
            aria-label="Page 3"
          >
            3
          </motion.button>
        </div>
        
        <motion.button 
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.95 }}
          className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center font-medium text-gray-600 transition-all"
          aria-label="Go to next page"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.nav>
    </div>
  );

  // Add a new method to render the highlighted kudos card
  const renderHighlightedKudos = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First kudos card - Jasmine Reyes */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-full"
        >
          <div className="p-5 flex flex-col h-full">
            <div className="flex items-start">
              <div className="h-10 w-10 bg-green-100 rounded-full overflow-hidden mr-3 flex-shrink-0">
                <img 
                  src="/images/jasmine-reyes.jpg" 
                  alt="Jasmine Reyes" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=Jasmine+Reyes&background=a7f3d0&color=065f46`;
                  }}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-rose-600 pb-0.5">
                      Jasmine Reyes
                    </h3>
                    <div className="flex items-center">
                      <span className="text-blue-500 text-sm font-medium">Impressive!</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 my-4 flex-grow text-base bg-amber-50 p-3 rounded-lg">
              Fresh. Fresh. Fresh. That's how the plans for the new building look. Our client is going to be completely blown away!
            </p>
            
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                  Creative Thinking
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                  Passion
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Positive
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-100 bg-gray-50 -mx-5 px-5 py-2">
                <span className="text-xs text-gray-500">4 hours ago</span>
                <div className="flex items-center bg-amber-50 px-3 py-1 rounded-lg">
                  <span className="text-xs font-bold text-amber-700 mr-1">From</span>
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-gray-900 mr-1">Eric Cheung</span>
                    <div className="h-6 w-6 bg-orange-100 rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src="/images/eric-cheung.jpg" 
                        alt="Eric Cheung"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=Eric+Cheung&background=ffedd5&color=9a3412`;
                        }}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Second kudos card - Alex Morgan */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-md overflow-hidden border border-indigo-200 h-full"
        >
          <div className="p-5 flex flex-col h-full">
            <div className="flex items-start">
              <div className="h-10 w-10 bg-indigo-500 rounded-full overflow-hidden mr-3 flex-shrink-0">
                <img 
                  src="/images/alex-morgan.jpg" 
                  alt="Alex Morgan" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=Alex+Morgan&background=6366F1&color=ffffff`;
                  }}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 pb-0.5">
                      Alex Morgan
                    </h3>
                    <div className="flex items-center">
                      <span className="text-indigo-600 text-sm font-medium">Simply outstanding!</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 my-4 flex-grow text-base bg-indigo-50 p-3 rounded-lg">
              Thank you for taking the time to help me with the database optimization. The queries are now running 10x faster!
            </p>
            
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  Teamwork
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Technical Excellence
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  Problem Solving
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-2 pt-3 border-t border-indigo-200 bg-indigo-50/50 -mx-5 px-5 py-2">
                <span className="text-xs text-gray-500">Yesterday</span>
                <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                  <span className="text-xs font-bold text-blue-700 mr-1">From</span>
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-gray-900 mr-1">Sarah Johnson</span>
                    <div className="h-6 w-6 bg-blue-100 rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src="/images/sarah-johnson.jpg" 
                        alt="Sarah Johnson"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=Sarah+Johnson&background=DBEAFE&color=1E40AF`;
                        }}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Third kudos card - Miguel Rodriguez */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl shadow-md overflow-hidden border border-emerald-200 h-full"
        >
          <div className="p-5 flex flex-col h-full">
            <div className="flex items-start">
              <div className="h-10 w-10 bg-emerald-500 rounded-full overflow-hidden mr-3 flex-shrink-0 ring-2 ring-white">
                <img 
                  src="/images/miguel-rodriguez.jpg" 
                  alt="Miguel Rodriguez" 
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=Miguel+Rodriguez&background=10B981&color=ffffff`;
                  }}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 pb-0.5">
                      Miguel Rodriguez
                    </h3>
                    <div className="flex items-center">
                      <span className="text-emerald-600 text-sm font-medium">Beyond expectations!</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 my-4 flex-grow text-base bg-emerald-50 p-3 rounded-lg">
              Your customer-first approach to the product redesign has been game-changing. User testing scores improved by 40%!
            </p>
            
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                  Customer Focus
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                  Leadership
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Initiative
                </span>
              </div>
              
              <div className="flex justify-between items-center mt-2 pt-3 border-t border-emerald-200 bg-emerald-50/50 -mx-5 px-5 py-2">
                <span className="text-xs text-gray-500">2 days ago</span>
                <div className="flex items-center bg-teal-50 px-3 py-1 rounded-lg">
                  <span className="text-xs font-bold text-teal-700 mr-1">From</span>
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-gray-900 mr-1">Lisa Chen</span>
                    <div className="h-6 w-6 bg-teal-100 rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src="/images/lisa-chen.jpg" 
                        alt="Lisa Chen"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=Lisa+Chen&background=CCFBF1&color=115E59`;
                        }}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-8 ${className}`}
      data-testid="dashboard-kudos-wall"
    >
      {/* Enhanced Heading with Colorful Design */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center">
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center mr-5 shadow-lg"
            >
              <span className="text-2xl text-white">🏆</span>
            </motion.div>
            <div>
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                Kudos Wall
              </h2>
              <p className="text-gray-500 mt-1 max-w-md">
                Celebrate achievements and recognize teammates' outstanding contributions
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center mt-4 md:mt-0">
            <motion.div
              whileHover={{ y: -2 }}
              className="flex items-center px-4 py-2 bg-indigo-50 rounded-xl shadow-sm border border-indigo-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-indigo-800 font-medium">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {renderFilterSection()}
      
      {/* Kudos Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mb-10"
      >
        {renderHighlightedKudos()}
      </motion.div>
      
      {/* Square Kudos Cards in Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 mb-8">
        {renderTeamKudos("Engineering")}
        {renderTeamKudos("Design")}
        {renderTeamKudos("Product")}
      </div>
      
      {renderPagination()}
    </div>
  );
};

export default DashboardKudosWall;
