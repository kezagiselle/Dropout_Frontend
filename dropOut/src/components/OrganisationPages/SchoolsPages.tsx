import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ExternalLink, ChevronLeft, ChevronRight, Menu, X, Bell, Calendar } from 'lucide-react';
import { FaSchool } from "react-icons/fa6";
import { IoMdSchool } from "react-icons/io";
import { PiWarningBold, PiWarningCircle } from "react-icons/pi";
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar';
import userr from "../../../src/img/userr.png";
import { useUserAuth } from '../../context/useUserAuth';

export default function SchoolsPage() {
  const [selectedRegion, setSelectedRegion] = useState('GASABO');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('Schools');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUserAuth();

  const handleNavigation = (path: string, tabName: string) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const schools = [
    { name: 'Westfield High School', region: 'Region A', dropoutRate: '3.2%', riskLevel: 'Low' },
    { name: 'Washington High School', region: 'Region B', dropoutRate: '8.7%', riskLevel: 'Medium' },
    { name: 'Roosevelt Middle School', region: 'Region C', dropoutRate: '12.4%', riskLevel: 'High' },
  ];

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Low':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'High':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
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
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.name || 'Education Organization'}</span>
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
                onClick={() => handleNavigation('/reports', 'Reports')}
                className="hover:text-orange-600 transition-colors"
              >
                Reports
              </button>
              <button 
                onClick={() => handleNavigation('/organization-settings', 'Settings')}
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
              <img src={userr} alt="User profile" className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full object-cover" />
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Organization Admin'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Use the OrganizationSidebar component */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6">
          {/* Filters Bar */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-sm font-medium text-gray-700">Filters:</span>
              
              {/* All Schools Dropdown */}
              <div className="relative">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-400 transition-colors text-sm">
                  <span className="text-gray-700">All Schools</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* All Teachers Dropdown */}
              <div className="relative">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-400 transition-colors text-sm">
                  <span className="text-gray-700">All Teachers</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* All Students Dropdown */}
              <div className="relative">
                <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-2 hover:border-gray-400 transition-colors text-sm">
                  <span className="text-gray-700">All Students</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Save Filter Button */}
              <button className="px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium">
                Save Filter
              </button>
            </div>

            {/* Add School Button */}
            <button className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium whitespace-nowrap">
              + Add School
            </button>
          </div>

          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
              {/* Dropdown */}
              <div className="relative w-full sm:w-64">
                <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors">
                  <span className="font-semibold text-gray-900">{selectedRegion}</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Clear All Button */}
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm self-end sm:self-auto">
                Clear All
              </button>
            </div>

            {/* Stats Cards with new icons */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {/* Schools Card - FaSchool icon */}
              <div className="bg-orange-100 rounded-lg p-3 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-200 rounded-lg flex items-center justify-center">
                    <FaSchool className="text-orange-600 text-lg sm:text-xl" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Schools</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">3</span>
              </div>

              {/* Total Students Card - IoMdSchool icon */}
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <IoMdSchool className="text-blue-600 text-lg sm:text-xl" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Total Students</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">1200</span>
              </div>

              {/* Dropout Rate Card - PiWarningBold icon (orange) */}
              <div className="bg-orange-50 rounded-lg p-3 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <PiWarningBold className="text-orange-600 text-lg sm:text-xl" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">Dropout Rate</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">3%</span>
              </div>

              {/* At-Risk Students Card - PiWarningCircle icon (red) */}
              <div className="bg-red-50 rounded-lg p-3 sm:p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <PiWarningCircle className="text-red-600 text-lg sm:text-xl" />
                  </div>
                  <span className="text-gray-700 font-medium text-sm sm:text-base">At-Risk Students</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">30</span>
              </div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by school name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Region Filter */}
              <div className="relative w-full md:w-48">
                <button className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors">
                  <span className="text-gray-700 text-sm sm:text-base">All Regions</span>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
              </div>

              {/* Risk Level Filter */}
              <div className="relative w-full md:w-48">
                <button className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-lg flex items-center justify-between hover:border-gray-400 transition-colors">
                  <span className="text-gray-700 text-sm sm:text-base">All Risk Levels</span>
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700">School Name</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700">Region</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700">Dropout Rate</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700">Risk Level</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {schools.map((school, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <a href="#" className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base">
                          {school.name}
                        </a>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-sm sm:text-base">{school.region}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-gray-700 text-sm sm:text-base">{school.dropoutRate}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getRiskLevelColor(school.riskLevel)}`}>
                          {school.riskLevel}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4">
                        <a href="#" className="flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm">
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                          View Profile
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
              <div className="text-xs sm:text-sm text-gray-600">
                Showing 1 to 6 of 24 schools
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  Previous
                </button>
                <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-orange-500 text-white font-medium text-sm sm:text-base">
                  1
                </button>
                <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base">
                  2
                </button>
                <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base">
                  3
                </button>
                <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base">
                  4
                </button>
                <button className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  Next
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}