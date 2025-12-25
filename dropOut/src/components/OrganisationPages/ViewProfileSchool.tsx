import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Users, 
  AlertTriangle, 
  AlertCircle, 
  MapPin, 
  UserCheck, 
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
import { IoMdSchool } from "react-icons/io";
import { TbReportSearch } from "react-icons/tb";
import { FaSchool } from "react-icons/fa6";
import OrganizationSidebar from '../OrganisationPages/OrganisationSideBar';
import userr from "../../../src/img/userr.png";
import { useUserAuth } from '../../context/useUserAuth';

export default function SchoolDashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState('GASABO');
  const [activeTab, setActiveTab] = useState('Dashboard');
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
        {/* Organization Sidebar */}
        <OrganizationSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6">
          {/* Filters Bar */}
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-medium text-gray-700">Filters:</span>
              
              {/* All Schools Dropdown */}
              <div className="relative">
                <button className="px-2 sm:px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm">
                  <span className="text-gray-700">All Schools</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* All Teachers Dropdown */}
              <div className="relative">
                <button className="px-2 sm:px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm">
                  <span className="text-gray-700">All Teachers</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* All Students Dropdown */}
              <div className="relative">
                <button className="px-2 sm:px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 sm:gap-2 hover:border-gray-400 transition-colors text-xs sm:text-sm">
                  <span className="text-gray-700">All Students</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Save Filter Button */}
              <button className="px-2 sm:px-3 py-1.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-xs sm:text-sm font-medium">
                Save Filter
              </button>
            </div>
          </div>

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
            <div className="relative w-full sm:w-auto">
              <select 
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-8 sm:pr-10 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
              >
                <option value="GASABO">GASABO</option>
                <option value="KICUKIRO">KICUKIRO</option>
                <option value="NYARUGENGE">NYARUGENGE</option>
              </select>
              <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
            </div>
            <button className="text-orange-500 font-medium hover:text-orange-600 text-sm sm:text-base self-end sm:self-auto">
              Clear All
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-orange-100 p-1.5 sm:p-2 rounded-lg">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Schools</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">3</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-blue-100 p-1.5 sm:p-2 rounded-lg">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Total Students</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">1200</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-orange-100 p-1.5 sm:p-2 rounded-lg">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-orange-500" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">Dropout Rate</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">3%</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="bg-red-100 p-1.5 sm:p-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-500" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-gray-600">At-Risk Students</div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">30</div>
                </div>
              </div>
            </div>
          </div>

          {/* School Card */}
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-start mb-4 sm:mb-6 gap-4">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                {/* School Icon */}
                <div className="bg-green-100 rounded-lg p-4 sm:p-6 md:p-8 flex items-center justify-center w-full md:w-48 h-48 mx-auto md:mx-0">
                  <div className="text-center">
                    <FaSchool className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-orange-500 mx-auto mb-2 sm:mb-3" />
                    <div className="text-sm sm:text-base font-medium text-gray-700">Westfield High<br/>School</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  {/* Head of Department */}
                  <div className="bg-orange-50 rounded-lg p-4 sm:p-6 flex-1 min-h-[140px] sm:min-h-[192px] flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 sm:w-5 h-5 text-orange-500" />
                      <span className="text-xs sm:text-sm text-orange-600">Head of Department</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-orange-500">Sarah Wilson</div>
                  </div>

                  {/* Location */}
                  <div className="bg-green-50 rounded-lg p-4 sm:p-6 flex-1 min-h-[140px] sm:min-h-[192px] flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 sm:w-5 h-5 text-green-600" />
                      <span className="text-xs sm:text-sm text-green-600">Location</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-gray-400">Gasabo</div>
                  </div>
                </div>
              </div>

              <button className="bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:bg-orange-600 w-full lg:w-auto mt-4 lg:mt-0 text-sm sm:text-base">
                View
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-xs sm:text-sm text-blue-600">Total Enrollment</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">485</div>
              </div>

              <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <UserCheck className="w-4 h-4 text-green-600" />
                  <span className="text-xs sm:text-sm text-green-600">Teaching Staff</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">28</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              Westfield High School is committed to providing quality education in a nurturing environment. Our dedicated 
              staff works closely with families to ensure every student reaches their full potential.
            </p>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Student Statistics */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Student Statistics</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm sm:text-base text-gray-700">Total Students</span>
                    </div>
                    <span className="font-bold text-gray-800 text-sm sm:text-base">485</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-sm sm:text-base text-gray-700">Dropout Rate</span>
                    </div>
                    <span className="font-bold text-green-600 text-sm sm:text-base">3.2%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-blue-500" />
                      <span className="text-sm sm:text-base text-gray-700">Avg Attendance</span>
                    </div>
                    <span className="font-bold text-green-600 text-sm sm:text-base">94.8%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm sm:text-base text-gray-700">At-Risk Students</span>
                    </div>
                    <span className="font-bold text-red-600 text-sm sm:text-base">12</span>
                  </div>
                </div>
              </div>

              {/* Academic & Behavior */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">Academic & Behavior</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-yellow-500">⭐</div>
                      <span className="text-sm sm:text-base text-gray-700">Average Grade</span>
                    </div>
                    <span className="font-bold text-blue-600 text-sm sm:text-base">B+ (87%)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-orange-500">⚡</div>
                      <span className="text-sm sm:text-base text-gray-700">Behavior Incidents</span>
                    </div>
                    <span className="font-bold text-orange-600 text-sm sm:text-base">8</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-4 sm:mt-6">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 sm:mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-400 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                      <TbReportSearch className="w-4 h-4 sm:w-5 h-5" />
                      View Full Report
                    </button>
                    <button className="w-full bg-red-500 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-red-600 transition-colors text-sm sm:text-base">
                      Delete School
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Schools Button */}
          <div className="flex justify-center sm:justify-end">
            <button className="w-full sm:w-auto bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm sm:text-base">
              View All Schools
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}