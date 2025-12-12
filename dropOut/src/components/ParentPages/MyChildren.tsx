import React, { useState } from 'react';
import { Users, AlertTriangle, CheckCircle, Calendar, TrendingUp, User, Zap, List, ChevronDown, Bell, Menu, X } from 'lucide-react';
import { IoMdSettings } from "react-icons/io";
import userr from "../../../src/img/userr.png";
import { useNavigate } from 'react-router-dom';
import pe1 from "../../img/pe1.png";
import pe2 from "../../img/pe2.png";
import { useUserAuth } from '../../context/useUserAuth';
import ParentSidebar from './ParentSidebar';

export default function MyChildren() {
  const [activeTab, setActiveTab] = useState('My Children');
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
          {/* Left Section - Mobile Menu Button and School Name */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-semibold text-gray-800 text-xs sm:text-sm lg:text-base">{user?.schoolName || 'School Name'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>

            {/* Header Navigation Links */}
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-600">
              <button 
                onClick={() => handleNavigation('/parent-dash', 'Dashboard')}
                className="hover:text-orange-600 transition-colors"
              >
                Dashboard
              </button>
              <button 
                onClick={() => handleNavigation('/parent-children', 'My Children')}
                className="hover:text-orange-600 transition-colors"
              >
                My Children
              </button>
              <button 
                onClick={() => handleNavigation('/parent-messages', 'Messages')}
                className="hover:text-orange-600 transition-colors"
              >
                Messages
              </button>
              <button 
                onClick={() => handleNavigation('/parent-settings', 'Settings')}
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
              <span className="text-xs sm:text-sm font-medium hidden sm:block">{user?.name || 'Parent'}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 hidden sm:block" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Use the ParentSidebar component */}
        <ParentSidebar 
          activeTab={activeTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleNavigation={handleNavigation}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-6">
          <div className="mb-4">
            <button
              onClick={() => handleNavigation('/parent-dash', 'Dashboard')}
              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Children Overview</h1>
            <p className="text-sm text-gray-600">Track academic performance and attendance for all your children</p>
          </div>

          {/* Stats Cards - Now on one line at the top */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Total Children */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Children</p>
                  <p className="text-3xl font-bold">2</p>
                </div>
              </div>
            </div>

            {/* At-Risk Children */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">At-Risk Children</p>
                  <p className="text-3xl font-bold">1</p>
                </div>
              </div>
            </div>

            {/* Normal Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Normal Status</p>
                  <p className="text-3xl font-bold">1</p>
                </div>
              </div>
            </div>
          </div>

          {/* Children Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* John Doe Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img src={pe1} alt="John Doe" className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
                    <p className="text-sm text-gray-600">Grade 10 Student</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  Medium Risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Attendance */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">Attendance</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">88%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>

                {/* GPA */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">GPA</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">3.1</p>
                  <p className="text-xs text-gray-500">Out of 4.0</p>
                </div>
              </div>

              <button className="w-full bg-blue-300 text-blue-900 py-3 rounded-lg hover:bg-blue-400 transition font-medium flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                View Full Profile
              </button>
            </div>

            {/* Jane Doe Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img src={pe2} alt="Jane Doe" className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Jane Doe</h3>
                    <p className="text-sm text-gray-600">Grade 7 Student</p>
                  </div>
                </div>
                <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Low Risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Attendance */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">Attendance</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">95%</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>

                {/* GPA */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">GPA</p>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">3.8</p>
                  <p className="text-xs text-gray-500">Out of 4.0</p>
                </div>
              </div>

              <button className="w-full bg-blue-300 text-blue-900 py-3 rounded-lg hover:bg-blue-400 transition font-medium flex items-center justify-center gap-2">
                <User className="w-4 h-4" />
                View Full Profile
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Quick Actions</h2>
                <p className="text-sm text-gray-600">Manage your children's profiles and information</p>
              </div>
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-indigo-600" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition font-medium flex items-center justify-center gap-2">
                <List className="w-5 h-5" />
                View at Risk
              </button>
              <button className="bg-green-400 text-green-900 py-4 rounded-lg hover:bg-green-500 transition font-medium flex items-center justify-center gap-2">
                <List className="w-5 h-5" />
                View All Children
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}