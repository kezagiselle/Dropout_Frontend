import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronDown, 
  Search, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  X,
  Bell,
  Calendar
} from 'lucide-react';
import { FaSchool } from "react-icons/fa6";
import { IoMdSchool } from "react-icons/io";
import { PiWarningBold, PiWarningCircle } from "react-icons/pi";
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar';
import userr from "../../../src/img/userr.png";
import { useUserAuth } from '../../context/useUserAuth';

export default function StudentPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('GASABO');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('All Risk Levels');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [activeTab, setActiveTab] = useState('Students');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const schools = [
    { id: 1, name: 'Westfield High School', region: 'Region A', students: 570, color: 'green' },
    { id: 2, name: 'Washington High School', region: 'Region B', students: 360, color: 'yellow' },
    { id: 3, name: 'Roosevelt Middle School', region: 'Region C', students: 200, color: 'red' },
  ];

  const getStudentBadgeColor = (students: number) => {
    if (students >= 500) return 'bg-green-100 text-green-700';
    if (students >= 300) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 lg:px-6">
          {/* Left Section - Mobile Menu Button and Organization Name */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base truncate max-w-[120px] sm:max-w-none">
                {user?.name || 'Education Organization'}
              </span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <button 
                onClick={() => handleNavigation('/org-dash', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/org-schools', 'Schools')}
                className="hover:text-orange-600 transition-colors"
              >
                Schools
              </button>
              <button 
                onClick={() => handleNavigation('/student-page', 'Students')}
                className="hover:text-orange-600 transition-colors"
              >
                Students
              </button>
              <button 
                onClick={() => handleNavigation('/reports', 'Reports')}
                className="hover:text-orange-600 transition-colors"
              >
                Reports
              </button>
              <button 
                onClick={() => handleNavigation('/organ-settings', 'Settings')}
                className="hover:text-orange-600 transition-colors"
              >
                Settings
              </button>
            </div>
          </div>

          {/* Right Section - Calendar, Notifications, Profile */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            {/* Calendar - Hidden on mobile, visible on tablet and up */}
            <div className="hidden sm:flex items-center gap-1 lg:gap-2 text-xs sm:text-sm text-gray-600">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden lg:inline">Jan 15 - Feb 18, 2024</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden lg:block" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </div>

            {/* Profile - Compact on mobile */}
            <div className="flex items-center gap-1 sm:gap-2">
              <img 
                src={userr} 
                alt="User profile" 
                className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" 
              />
              <span className="text-xs sm:text-sm font-medium hidden sm:block truncate max-w-[100px] lg:max-w-none">
                {user?.name || 'Admin'}
              </span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Organization Sidebar */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          {/* Filters Bar - Enhanced Responsiveness */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Filters:</span>
              
              {/* All Schools Dropdown */}
              <div className="relative">
                <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm min-w-[100px]">
                  <span className="text-gray-700 truncate">All Schools</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                </button>
              </div>

              {/* All Teachers Dropdown */}
              <div className="relative">
                <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm min-w-[100px]">
                  <span className="text-gray-700 truncate">All Teachers</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                </button>
              </div>

              {/* All Students Dropdown */}
              <div className="relative">
                <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm min-w-[100px]">
                  <span className="text-gray-700 truncate">All Students</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                </button>
              </div>

              {/* Save Filter Button */}
              <button className="px-2 py-1.5 sm:px-3 sm:py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap">
                Save Filter
              </button>
            </div>

            {/* Add Student Button */}
            <button
              onClick={() => navigate('/add-school')}
              className="w-full sm:w-auto px-3 py-2 sm:px-4 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm font-medium whitespace-nowrap mt-2 sm:mt-0"
            >
              + Add School
            </button>
          </div>

          {/* Stats Cards Section */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 lg:mb-6 gap-3">
              {/* Dropdown */}
              <div className="relative w-full sm:w-48 lg:w-64">
                <button className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors">
                  <span className="font-semibold text-gray-900 text-sm sm:text-base truncate">{selectedDistrict}</span>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                </button>
              </div>

              {/* Clear All Button */}
              <button className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm self-end sm:self-auto whitespace-nowrap">
                Clear All
              </button>
            </div>

            {/* Stats Cards with updated backgrounds - Enhanced grid responsiveness */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {/* Schools Card */}
              <div className="bg-white rounded-lg p-2 sm:p-3 lg:p-4 flex items-center justify-between border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaSchool className="text-orange-600 text-base sm:text-lg lg:text-xl" />
                  </div>
                  <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base truncate">Schools</span>
                </div>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 ml-2">3</span>
              </div>

              {/* Total Students Card - Light blue background */}
              <div className="bg-blue-50 rounded-lg p-2 sm:p-3 lg:p-4 flex items-center justify-between border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IoMdSchool className="text-blue-600 text-base sm:text-lg lg:text-xl" />
                  </div>
                  <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base truncate">Total Students</span>
                </div>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 ml-2">1200</span>
              </div>

              {/* Dropout Rate Card */}
              <div className="bg-white rounded-lg p-2 sm:p-3 lg:p-4 flex items-center justify-between border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PiWarningBold className="text-orange-600 text-base sm:text-lg lg:text-xl" />
                  </div>
                  <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base truncate">Dropout Rate</span>
                </div>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 ml-2">3%</span>
              </div>

              {/* At-Risk Students Card */}
              <div className="bg-white rounded-lg p-2 sm:p-3 lg:p-4 flex items-center justify-between border border-gray-200 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PiWarningCircle className="text-red-600 text-base sm:text-lg lg:text-xl" />
                  </div>
                  <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base truncate">At-Risk Students</span>
                </div>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 ml-2">30</span>
              </div>
            </div>
          </div>

          {/* Search and Filters - Enhanced Responsiveness */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Student by ID and name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>

              {/* All Regions Dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 pr-8 sm:pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                >
                  <option value="All Regions">All Regions</option>
                  <option value="Region A">Region A</option>
                  <option value="Region B">Region B</option>
                  <option value="Region C">Region C</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* All Risk Levels Dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={selectedRiskLevel}
                  onChange={(e) => setSelectedRiskLevel(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 pr-8 sm:pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm sm:text-base"
                >
                  <option value="All Risk Levels">All Risk Levels</option>
                  <option value="High Risk">High Risk</option>
                  <option value="Medium Risk">Medium Risk</option>
                  <option value="Low Risk">Low Risk</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Schools Table - Enhanced Responsiveness */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 sm:mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">School Name</th>
                    <th className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Region</th>
                    <th className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Number of Students</th>
                    <th className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schools.map((school) => (
                    <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm lg:text-base truncate block max-w-[150px] sm:max-w-none">
                          {school.name}
                        </a>
                      </td>
                      <td className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4 text-gray-700 text-xs sm:text-sm lg:text-base whitespace-nowrap">
                        {school.region}
                      </td>
                      <td className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                        <span className={`inline-flex items-center px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${getStudentBadgeColor(school.students)} whitespace-nowrap`}>
                          {school.students}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 sm:px-4 sm:py-3 lg:px-6 lg:py-4">
                        <button className="flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm whitespace-nowrap">
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                          <span className="hidden xs:inline">View Profile</span>
                          <span className="xs:hidden">View Profile</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination - Enhanced Responsiveness */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
              Showing 1 to {schools.length} of 24 schools
            </div>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm whitespace-nowrap"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>

              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                    currentPage === page
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
                disabled={currentPage === 4}
                className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm whitespace-nowrap"
              >
                <span className="hidden sm:inline">Next</span>
                <span className="sm:hidden">Next</span>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}